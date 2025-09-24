const css = `
  * {
    user-select: text !important;
  }
  *::selection {
    background: transparent !important;
    color: inherit !important;
  }
`;

function isInjectableUrl(url) {
  return url && !url.startsWith('chrome://') && !url.startsWith('chrome-extension://');
}

function injectCSS(tabId) {
  chrome.tabs.get(tabId, (tab) => {
    if (chrome.runtime.lastError || !isInjectableUrl(tab.url)) {
      return;
    }
    chrome.scripting.insertCSS({
      target: { tabId: tabId, allFrames: true },
      css: css
    }).catch(() => {
      // Ignore errors such as "Frame with ID 0 was removed"
    });
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    injectCSS(tabId);
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  injectCSS(activeInfo.tabId);
});