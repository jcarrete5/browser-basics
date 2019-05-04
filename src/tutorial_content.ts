async function inject_html(page: string) {
	try {
		let response = await fetch(chrome.extension.getURL(page));
		let html = await response.text()
		document.body.innerHTML += html;
	} catch (e) {
		console.error(e);
	}
}

inject_html("/ui/tutorial.html");