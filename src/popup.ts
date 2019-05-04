document.addEventListener('DOMContentLoaded', () => {
  let learn = document.getElementById('learn')
  if (learn != null) {
    learn.addEventListener('click', () => {
      chrome.tabs.create({url: chrome.runtime.getURL('learn_modules/index.html')});
    });
  } else {
    console.error("`learn` id is null");
  }
});
