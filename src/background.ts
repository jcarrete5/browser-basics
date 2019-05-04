chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.create({
		active: true,
		url: "https://google.com/"
	}, () => {

	})
});
