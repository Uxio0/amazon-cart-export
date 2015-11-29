document.addEventListener('DOMContentLoaded', function() {
});

chrome.extension.onMessage.addListener(function(request, sender, callback) {
  var tabId = request.tabId;
  chrome.tabs.executeScript(tabId, { file: "content.js" }, function() {
    chrome.tabs.sendMessage(tabId, {}, function(results) {
      validateLinks(results, callback);
    });
  });
});
