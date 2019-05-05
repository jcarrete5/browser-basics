chrome.runtime.onMessage.addListener(async (message, sender) => {
    switch (message.action) {
        case "CreateDialog": {
            try {
                let response = await fetch(chrome.extension.getURL("ui/dialog.html"));
                let html = await response.text();

                let container = document.createElement("div");
                container.id = "wc-dialog-scoped-content";
                container.innerHTML = html;

                if (message.type === "text") {
                    container.innerHTML.replace("[$REPLACE]", `<h2>${message.content}</h2>`);
                } else {
                    // html
                    let inner = await fetch(chrome.extension.getURL(message.content));
                    let innerHtml = await response.text();
                    container.innerHTML.replace("[$REPLACE]", innerHtml);
                }

                document.body.appendChild(container);
            } catch (e) {
                console.error(e);
            }
            break;
        }

        default:
            break;
    }
});