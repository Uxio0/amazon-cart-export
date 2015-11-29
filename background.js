function generateCsv(products) {
    var csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Name,Price,Currency\n';
    products.forEach(function(product) {
       csvContent += [product.name, product.price.value, product.price.currency].join(',') + '\n';
    });
    return csvContent;
}

function downloadCsv(csvContent) {
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
}

chrome.pageAction.onClicked.addListener(function(tab) {
  var tabId = tab.id;
  chrome.tabs.executeScript(tabId, { file: "content.js" }, function() {
    chrome.tabs.sendMessage(tabId, {}, function(results) {
        var myCsv = generateCsv(results);
        downloadCsv(myCsv);
    });
  });
});

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains 'amazon' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'amazon.' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
