// Filters the Events page's existing cards, including full institution
// names when abbreviations are displayed, without changing their
// date order or Upcoming/Past grouping. ISO dates are compared directly
// so date-range endpoints stay inclusive and independent of timezones.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var filters = document.getElementById("events-filters");
    if (!filters) return;

    var searchInput = document.getElementById("events-search");
    var categories = filters.querySelectorAll('[data-filter-type="category"]');
    var fromInput = document.getElementById("events-start-from");
    var toInput = document.getElementById("events-start-to");
    var dateError = document.getElementById("events-date-error");
    var clearButton = document.getElementById("events-filters-clear");
    var searchToggle = document.getElementById("events-search-toggle");
    var emptyMessage = document.getElementById("events-empty-message");

    function normalize(text) {
      return text.toLowerCase().replace(/\s+/g, " ").trim();
    }

    var groups = [];
    document.querySelectorAll(".events-group").forEach(function (group) {
      var cards = [];
      group.querySelectorAll(".event-card").forEach(function (card) {
        cards.push({
          element: card,
          text: normalize(card.textContent + " " + (card.dataset.institution || "")),
          category: card.dataset.category,
          start: card.dataset.start
        });
      });
      groups.push({ element: group, cards: cards });
    });

    function applyFilters() {
      var query = normalize(searchInput.value);
      var selectedCategories = [];
      categories.forEach(function (checkbox) {
        if (checkbox.checked) selectedCategories.push(checkbox.value);
      });

      var from = fromInput.value;
      var to = toInput.value;
      var invalidRange = !!(from && to && from > to);
      var hasFilters = !!(query || selectedCategories.length || from || to);
      var anyVisible = false;

      fromInput.max = to;
      toInput.min = from;
      fromInput.setAttribute("aria-invalid", invalidRange ? "true" : "false");
      toInput.setAttribute("aria-invalid", invalidRange ? "true" : "false");
      var dateDescription = "events-date-hint" + (invalidRange ? " events-date-error" : "");
      fromInput.setAttribute("aria-describedby", dateDescription);
      toInput.setAttribute("aria-describedby", dateDescription);
      dateError.hidden = !invalidRange;

      groups.forEach(function (group) {
        var groupHasVisible = false;
        group.cards.forEach(function (card) {
          var visible = !invalidRange &&
            (!query || card.text.indexOf(query) !== -1) &&
            (!selectedCategories.length || selectedCategories.indexOf(card.category) !== -1) &&
            (!from || card.start >= from) &&
            (!to || card.start <= to);

          card.element.hidden = !visible;
          if (visible) groupHasVisible = true;
        });

        group.element.hidden = hasFilters && !groupHasVisible;
        if (groupHasVisible) anyVisible = true;
      });

      emptyMessage.hidden = anyVisible || !hasFilters || invalidRange;
    }

    searchInput.addEventListener("input", applyFilters);
    fromInput.addEventListener("input", applyFilters);
    toInput.addEventListener("input", applyFilters);
    categories.forEach(function (checkbox) {
      checkbox.addEventListener("change", applyFilters);
    });

    clearButton.addEventListener("click", function () {
      searchInput.value = "";
      fromInput.value = "";
      toInput.value = "";
      categories.forEach(function (checkbox) {
        checkbox.checked = false;
      });
      applyFilters();
    });

    searchToggle.addEventListener("click", function () {
      filters.hidden = !filters.hidden;
      searchToggle.classList.toggle("active", !filters.hidden);
      searchToggle.setAttribute("aria-expanded", filters.hidden ? "false" : "true");
      if (!filters.hidden) searchInput.focus();
    });

    applyFilters();
  });
})();
