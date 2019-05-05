async function inject_html(page: string) {
    try {
        let response = await fetch(chrome.extension.getURL(page));
        let html = await response.text();

        let container = document.createElement("div");
        container.id = "wc-tut-scoped-content";
        container.innerHTML = html;

        document.body.appendChild(container);

        const closeBtn = document.getElementById("wc-tut-close");

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                const container = document.getElementById("wc-tut-container");
                if (container) {
                    container.remove();
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
}

inject_html("/ui/tutorial.html");

chrome.runtime.sendMessage(
    {
        target: "dialog",
        content:
        {
            action: "CreateDialog",
            type: "text",
            content: {
                id: "test",
                content: "test"
            }
        }
    }
);