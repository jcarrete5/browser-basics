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

    // Choose a random quick tip
    let tips = [
        "You can use your email address to sign up for sites and services on the internet.",
        "Did you know that you can shop for goods online instead of going to the store?",
        "Wiki pages are a great place to learn more about a topic you are interested in."
    ];
    let tip_index = Math.floor(Math.random() * tips.length);
    let tip_elm = document.getElementById('tip');
    if (tip_elm != null) {
        tip_elm.innerHTML = `<strong>Tip:</strong> ${tips[tip_index]}`;
    } else {
        console.log("`tip` id is null");
    }
});
