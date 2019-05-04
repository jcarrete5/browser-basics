"use strict";
document.addEventListener('DOMContentLoaded', function () {
    var learn = document.getElementById('learn');
    if (learn != null) {
        learn.addEventListener('click', function () {
            chrome.tabs.create({ url: chrome.runtime.getURL('learn_modules/index.html') });
        });
    }
    else {
        console.error("`learn` id is null");
    }
});
