chrome.runtime.onMessage.addListener(async (message, sender) => {
    console.log(message);
    switch (message.action) {
        case "CreateDialog": {
            try {
                let response = await fetch(chrome.extension.getURL("ui/dialog.html"));
                let html = await response.text();
                let css_response = await fetch(chrome.extension.getURL('ui/css/dialog.css'));
                let css = await css_response.text();

                // Insert css into html
                html = `<style>${css}</style>\n${html}`;

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
                    innerContainer.innerHTML = innerContainer.innerHTML.replace(/\[\$REPLACE_BODY\]/g, `<h3>${message.data}</h3>`);
                } else if(message.type === "html_string") {
                    innerContainer.innerHTML = innerContainer.innerHTML.replace(/\[\$REPLACE_BODY\]/g, message.data);
                } else {
                    // html
                    let inner = await fetch(chrome.extension.getURL(message.data));
                    let innerHtml = await inner.text();
                    innerContainer.innerHTML = innerContainer.innerHTML.replace(/\[\$REPLACE_BODY\]/g, innerHtml);
                }

                innerContainer.innerHTML = innerContainer.innerHTML.replace(/\[\$REPLACE_ID\]/g, message.id);

                if (innerContainer && message.style) {
                    // set css overrides
                    Object.entries(message.style).forEach((v) => {
                        let key = v[0];
                        let val = v[1] as string;

                        innerContainer.style[key as unknown as number] = val;
                    });
                }

                let closeBtn = innerContainer.querySelector('.wc-dialog-close');
                if (closeBtn) {
                    closeBtn.addEventListener("click", () => {
                        innerContainer.remove();
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
