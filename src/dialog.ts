chrome.runtime.onMessage.addListener(async (message, sender) => {
    console.log(message);
    switch (message.action) {
        case "CreateDialog": {
            try {
                let response = await fetch(chrome.extension.getURL("ui/dialog.html"));
                let html = await response.text();

                // get/create top level container
                let container = document.getElementById("wc-dialog-scoped-content");
                if (!container) {
                    container = document.createElement("div");
                    container.id = "wc-dialog-scoped-content";
                }

                // create dialog container
                let innerContainer = document.createElement("div");
                innerContainer.id = message.content.id;
                innerContainer.className = "wc-dialog-container";
                innerContainer.innerHTML = html;


                if (message.type === "text") {
                    innerContainer.innerHTML = innerContainer.innerHTML.replace("[$REPLACE]", `<h2>${message.content.content}</h2>`);
                } else {
                    // html
                    let inner = await fetch(chrome.extension.getURL(message.content));
                    let innerHtml = await inner.text();
                    innerContainer.innerHTML = innerContainer.innerHTML.replace("[$REPLACE]", innerHtml);
                }

                container.appendChild(innerContainer);
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