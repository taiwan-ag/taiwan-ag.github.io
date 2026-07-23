// Wires up the light/dark toggle button (see _includes/header.html and
// the .theme-toggle rule in main.css). The initial data-theme attribute
// (if any) is set earlier by the inline script in _layouts/default.html,
// so a stored choice takes effect before the page paints; this file only
// needs to handle clicks and keep the button's icon in sync.

(function () {
  function currentTheme() {
    var stored = document.documentElement.getAttribute("data-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // Solid-style sun/moon icons, drawn with currentColor so they pick up
  // .theme-toggle's gray rather than being fixed-color emoji.
  var sunIcon =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="5"/>' +
    '<g stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
    '<line x1="12" y1="1" x2="12" y2="3"/>' +
    '<line x1="12" y1="21" x2="12" y2="23"/>' +
    '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>' +
    '<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
    '<line x1="1" y1="12" x2="3" y2="12"/>' +
    '<line x1="21" y1="12" x2="23" y2="12"/>' +
    '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>' +
    '<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' +
    "</g></svg>";
  var moonIcon =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
    "</svg>";

  // Shows the theme a click would switch TO, not the current one, both
  // as the icon and as the hover tooltip (title also drives aria-label,
  // so screen readers announce the same "switch to" phrasing).
  function updateIcon(button, theme) {
    button.innerHTML = theme === "dark" ? sunIcon : moonIcon;
    var label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    button.title = label;
    button.setAttribute("aria-label", label);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("theme-toggle");
    if (!button) return;

    updateIcon(button, currentTheme());

    button.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateIcon(button, next);
    });
  });
})();
