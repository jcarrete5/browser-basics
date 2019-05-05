chrome.runtime.sendMessage(
    {
        target: "tab",
        content:
        {
            action: "CreateDialog",
            type: "html",
            id: "test",
            data: "ui/tutorial/tut_1.html",
            style: {
                top: `${(window.innerHeight / 2) - 80}px`,
                left: `${(window.innerWidth / 2) - 150}px`
            }
        }
    }
);
