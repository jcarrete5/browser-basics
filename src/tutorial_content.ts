chrome.storage.sync.get((items) => {
    console.log('tut', items['tutorialDone']);
    if (!items['tutorialDone']) {
        chrome.runtime.sendMessage(
            {
                target: "tab",
                content:
                {
                    action: "CreateDialog",
                    type: "html",
                    id: "tut",
                    data: "ui/tutorial/tut_intro.html",
                    style: {
                        transform: "translate(100%, 100%)"
                    }
                }
            }
        );
    }
});

window.addEventListener("tut_omni", () => {
    chrome.runtime.sendMessage(
        {
            target: "tab",
            content:
            {
                action: "UpdateDialog",
                id: "tut",
                type: "html",
                data: "ui/tutorial/tut_omni.html",
                style: {
                    transform: "translate(100%, 0)"
                },
                arrow: "top",
            }
        }
    );
});

window.addEventListener("tut_ssl", () => {
    chrome.runtime.sendMessage(
        {
            target: "tab",
            content:
            {
                action: "UpdateDialog",
                id: "tut",
                type: "html",
                data: "ui/tutorial/tut_ssl.html",
                style: {
                    transform: "translate(10%, 0)"
                },
                arrow: "top",
                arrowTransform: {
                    x: "-60px"
                }
            }
        }
    );
});

window.addEventListener("tut_reload", () => {
    chrome.runtime.sendMessage(
        {
            target: "tab",
            content:
            {
                action: "UpdateDialog",
                id: "tut",
                type: "html",
                data: "ui/tutorial/tut_reload.html",
                arrow: "top",
                arrowTransform: {
                    x: "-20px"
                }
            }
        }
    );
});

window.addEventListener("tut_forwards", () => {
    chrome.runtime.sendMessage(
        {
            target: "tab",
            content:
            {
                action: "UpdateDialog",
                id: "tut",
                type: "html",
                data: "ui/tutorial/tut_forwards.html",
                style: {
                    transform: "translate(2%, 0)"
                },
                arrow: "top",
                arrowTransform: {
                    x: "-34px"
                }
            }
        }
    );
});

window.addEventListener("tut_back", () => {
    chrome.runtime.sendMessage(
        {
            target: "tab",
            content:
            {
                action: "UpdateDialog",
                id: "tut",
                type: "html",
                data: "ui/tutorial/tut_back.html",
                arrow: "top",
                arrowTransform: {
                    x: "-2px"
                }
            }
        }
    );
});

window.addEventListener("tut_bookmarks", () => {
    chrome.runtime.sendMessage(
        {
            target: "tab",
            content:
            {
                action: "UpdateDialog",
                id: "tut",
                type: "html",
                data: "ui/tutorial/tut_bookmarks.html",
                style: {
                    transform: "translate(186%, 0)"
                },
                arrow: "top",
                arrowTransform: {
                    x: "-50%"
                }
            }
        }
    );
});

window.addEventListener("finish", () => {
    chrome.runtime.sendMessage(
        {
            target: "tab",
            content:
            {
                action: "UpdateDialog",
                id: "tut",
                type: "html",
                data: "ui/tutorial/tut_more.html",
                style: {
                    transform: "translate(344%, 0)"
                },
                arrow: "top",
                arrowTransform: {
                    x: "-70%"
                }
            }
        }
    );
    chrome.storage.sync.set({tutorialDone: true});
});
