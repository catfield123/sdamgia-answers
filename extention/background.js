console.log('background running')

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
  let msg = {
      txt: "show"
  }
  chrome.tabs.sendMessage(tab.id, msg);
}
