// chrome.devtools.panels.create(
//   "CoffeeConsole",
//   "badge.png",
//   "coffee-console.html",
//   function cb(panel) {
//     panel.onShown.addListener(function(win){ win.focus(); });
//   }
// );
chrome.devtools.panels.create(
  "IDE",
  "badge.png",
  "ide.html",
  function cb(panel) {
    panel.onShown.addListener(function(win){ win.focus(); });
  }
);
