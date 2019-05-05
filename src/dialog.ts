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
                // innerContainer.id = message.id;
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

        case "UpdateDialog": {
            let container = document.getElementById(message.id);
            if (!container) {
                return;
            }

            if (message.type === "text") {
                container.innerHTML = `<h3>${message.data}</h3>`;
            } else if (message.type === "html_string") {
                container.innerHTML = `<div class="wc-dialog-close" id="wc-dialog-close">✕</div>` + message.data;
            } else if (message.type === "html") {
                if (message.data) {
                    // html
                    let inner = await fetch(chrome.extension.getURL(message.data));
                    let innerHtml = await inner.text();
                    container.innerHTML = `<div class="wc-dialog-close" id="wc-dialog-close">✕</div>` + innerHtml;
                }
            }

            let closeBtn = container.querySelector('.wc-dialog-close');
            if (closeBtn) {
                closeBtn.addEventListener("click", () => {
                    if (container && container.parentElement && container.parentElement.parentElement) {
                        container.parentElement.parentElement.remove();
                    }
                });
            }

            if (message.style) {
                // set css overrides
                Object.entries(message.style).forEach((v) => {
                    let key = v[0];
                    let val = v[1] as string;
                    if (container && container.parentElement && container.parentElement.parentElement) {
                        container.parentElement.parentElement.style[key as unknown as number] = val;
                    }
                });
            }

            if (message.arrow && container.parentElement && container.parentElement.parentElement) {
                switch (message.arrow) {
                    case "top":
                        container.parentElement.parentElement.classList.add(...["arrow", "top"]);
                    case "left":
                        container.parentElement.parentElement.classList.add(...["arrow", "left"]);
                    case "right":
                        container.parentElement.parentElement.classList.add(...["arrow", "right"]);
                    case "bottom":
                        container.parentElement.parentElement.classList.add(...["arrow", "bottom"]);
                        break;

                    default:
                        break;
                }

                if (message.arrowTransform) {
                    if (message.arrowTransform.x) {
                        document.documentElement.style.setProperty("--arrow-transform-x", message.arrowTransform.x);
                    }
                    if (message.arrowTransform.y) {
                        document.documentElement.style.setProperty("--arrow-transform-y", message.arrowTransform.y);
                    }
                }
            }

            break;
        }

        default:
            break;
    }
});
