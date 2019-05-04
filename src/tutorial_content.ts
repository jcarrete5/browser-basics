async function inject_html(page: string) {
    try {
        let response = await fetch(chrome.extension.getURL(page));
        let html = await response.text();

        let container = document.createElement("div");
        container.id = "wc-tut-scoped-content";
        container.innerHTML = html;

        document.body.appendChild(container);
    } catch (e) {
        console.error(e);
    }
}

inject_html("/ui/tutorial.html");