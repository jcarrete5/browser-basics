"use strict";
chrome.runtime.onInstalled.addListener(function () {
    chrome.windows.create({
        type: "panel",
        focused: true
    });
});
