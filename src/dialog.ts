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
                innerContainer.id = message.id;
                innerContainer.className = "wc-dialog-container";
                innerContainer.innerHTML = html;

                if (message.type === "text") {
                    innerContainer.innerHTML = innerContainer.innerHTML.replace("[$REPLACE]", `<h2>${message.data}</h2>`);
                } else {
                    // html
                    let inner = await fetch(chrome.extension.getURL(message.data));
                    let innerHtml = await inner.text();
                    innerContainer.innerHTML = innerContainer.innerHTML.replace("[$REPLACE]", innerHtml);
                }

                const innerContainerDivElem = (innerContainer.getElementsByClassName("wc-dialog-inner") as HTMLCollectionOf<HTMLDivElement>)[0];

                if (innerContainerDivElem && message.style) {
                    // set css overrides
                    Object.entries(message.style).forEach((v) => {
                        let key = v[0];
                        let val = v[1] as string;

                        innerContainerDivElem.style[key as unknown as number] = val;
                    });
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