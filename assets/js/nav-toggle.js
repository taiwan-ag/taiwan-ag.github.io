// Wires up the mobile hamburger button (#nav-toggle in header.html)
// that shows/hides the left-side nav drawer (#site-nav) below the
// desktop breakpoint. On desktop, #site-nav is a persistent sidebar
// instead, and this button is hidden by main.css, so none of this
// runs there in practice.

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("site-nav");
    var backdrop = document.getElementById("nav-backdrop");
    if (!toggle || !nav || !backdrop) return;

    function closeNav() {
      nav.classList.remove("open");
      backdrop.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
    }

    function openNav() {
      nav.classList.add("open");
      backdrop.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    backdrop.addEventListener("click", closeNav);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  });
})();
