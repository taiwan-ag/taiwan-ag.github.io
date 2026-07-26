// Drives the filter bar on the People page (#people-filters): a name
// search box plus position/affiliation checkboxes and research-interest
// tag chips, filtering the .person-card elements rendered by people.md.
// No-ops on every other page, since none of these elements exist there.
// Filtering only shows/hides existing cards -- it never reorders them,
// so the surname-alphabetical order rendered server-side is preserved.

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var filters = document.getElementById("people-filters");
    var groups = document.querySelectorAll(".people-group");
    if (!filters || !groups.length) return;

    var searchInput = document.getElementById("people-search");
    var checkboxes = filters.querySelectorAll('input[type="checkbox"][data-filter-type]');
    // Tag chips appear both in the filter bar and inline on each card;
    // both share the same click handler below, so clicking a tag on a
    // card filters the whole list to that tag too.
    var tagButtons = document.querySelectorAll('[data-filter-type="tag"]');
    var clearButton = document.getElementById("people-filters-clear");
    var emptyMessage = document.getElementById("people-empty-message");

    var activeTags = {};

    function activeValues(type) {
      var values = [];
      checkboxes.forEach(function (checkbox) {
        if (checkbox.dataset.filterType === type && checkbox.checked) {
          values.push(checkbox.value);
        }
      });
      return values;
    }

    function updateTagButtonStates() {
      tagButtons.forEach(function (button) {
        button.classList.toggle("active", !!activeTags[button.dataset.filterValue]);
      });
    }

    function applyFilters() {
      var positions = activeValues("position");
      var institutions = activeValues("institution");
      var tagIds = Object.keys(activeTags).filter(function (id) {
        return activeTags[id];
      });
      var query = (searchInput && searchInput.value || "").trim().toLowerCase();

      var anyVisible = false;

      groups.forEach(function (group) {
        var groupHasVisible = false;

        group.querySelectorAll(".person-card").forEach(function (card) {
          var visible = true;

          if (positions.length && positions.indexOf(card.dataset.position) === -1) {
            visible = false;
          }
          if (visible && institutions.length && institutions.indexOf(card.dataset.institution) === -1) {
            visible = false;
          }
          if (visible && tagIds.length) {
            var cardTags = (card.dataset.interests || "").split(" ").filter(Boolean);
            if (!tagIds.some(function (id) { return cardTags.indexOf(id) !== -1; })) {
              visible = false;
            }
          }
          if (visible && query && (card.dataset.name || "").indexOf(query) === -1) {
            visible = false;
          }

          card.hidden = !visible;
          if (visible) groupHasVisible = true;
        });

        group.hidden = !groupHasVisible;
        if (groupHasVisible) anyVisible = true;
      });

      if (emptyMessage) emptyMessage.hidden = anyVisible;
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", applyFilters);
    });

    tagButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var value = button.dataset.filterValue;
        activeTags[value] = !activeTags[value];
        updateTagButtonStates();
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = false;
        });
        activeTags = {};
        updateTagButtonStates();
        if (searchInput) searchInput.value = "";
        applyFilters();
      });
    }

    var searchToggle = document.getElementById("people-search-toggle");
    if (searchToggle) {
      searchToggle.addEventListener("click", function () {
        filters.hidden = !filters.hidden;
        searchToggle.classList.toggle("active", !filters.hidden);
        searchToggle.setAttribute("aria-expanded", filters.hidden ? "false" : "true");
        if (!filters.hidden && searchInput) searchInput.focus();
      });
    }

    applyFilters();
  });
})();
