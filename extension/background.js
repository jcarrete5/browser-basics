"use strict";
chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({
        active: true,
        url: "https://google.com/"
    }, function () {
    });
});
