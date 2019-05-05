document.addEventListener('DOMContentLoaded', () => {
    let learn = document.getElementById('learn')
    let browser = document.getElementById('browser');
    if (learn != null) {
        learn.addEventListener('click', () => {
            chrome.tabs.create({url: chrome.runtime.getURL('learn_modules/index.html')});
        });
    } else {
        console.error("`learn` id is null");
    }
    if (browser != null) {
        browser.addEventListener('click', () => {
            //TODO what happens when they want to replay the browser tutorial
        });
    } else {
        console.log("`browser` id is null");
    }
});
