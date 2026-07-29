// Wires up the info button (#info-toggle) in the header, which
// shows/hides the explanatory text in #info-popup (hidden by default via
// the `hidden` attribute).

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("info-toggle");
    var popup = document.getElementById("info-popup");
    if (!toggle || !popup) return;

    function closePopup() {
      popup.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    function openPopup() {
      popup.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      if (popup.hidden) {
        openPopup();
      } else {
        closePopup();
      }
    });

    // Closes when clicking anywhere outside the popup/button.
    document.addEventListener("click", function (event) {
      if (!popup.hidden && !popup.contains(event.target) && event.target !== toggle) {
        closePopup();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closePopup();
    });
  });
})();
