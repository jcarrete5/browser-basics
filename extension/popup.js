"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var learn = document.getElementById('learn');
    var browser = document.getElementById('browser');
    if (learn != null) {
        learn.addEventListener('click', function () {
            chrome.tabs.create({ url: chrome.runtime.getURL('learn_modules/index.html') });
        });
    }
    else {
        console.error("`learn` id is null");
    }
    if (browser != null) {
        browser.addEventListener('click', function () {
            //TODO what happens when they want to replay the browser tutorial
        });
    }
    else {
        console.log("`browser` id is null");
    }
});
