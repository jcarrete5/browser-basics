chrome.runtime.onInstalled.addListener(() => {
	chrome.windows.create({
		type: "panel",
		focused: true
	})
});
