chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#faa00a' }, function () {
    console.log('The color is orange.')
  })
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              schemes: ['http', 'https'],
            },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ])
  })
})
