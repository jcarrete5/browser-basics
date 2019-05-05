chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.create({
		active: true,
		url: "https://google.com/"
    });
});

chrome.runtime.onMessage.addListener(async (message, sender) => {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		const tabId = tabs[0].id;
		if (!tabId) {
			return;
		}
		switch (message.target) {
			case "dialog":
				chrome.tabs.sendMessage(tabId, message.content);
				break;

			default:
				break;
		}
	});
});