/*
Open a new tab, and load "window.html" into it.
*/

// Workaround for chrome based browsers
if (typeof browser === "undefined") {
  var browser = chrome;
}

var extension_tab_id = null;

function onCreated(tab) {
  extension_tab_id = tab.id;
  console.debug(`Created new tab: ${tab.id}`);
}

function onError(error) {
  console.error(`Error: ${error}`);
}

function openWindow() {
  console.log("injecting");
  if (extension_tab_id) {
    browser.tabs.update(extension_tab_id, { active: true });
  }
  else {
    let creating = browser.tabs.create({
      "url": "/window/window.html",
    });
    creating.then(onCreated, onError);
  }
}

browser.action.onClicked.addListener(openWindow);

