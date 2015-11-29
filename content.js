function standarizePrice(price) {
    var priceSplit = price.split(' ');
    var currency = priceSplit[0].trim();
    var noCurrency = priceSplit[1].trim();
    return {value: noCurrency.replace(',', '.'),
            currency: currency}
}
function getCartProducts() {
    var titles = document.querySelectorAll('.sc-product-title.a-text-bold');
    var prices = document.querySelectorAll('.sc-product-price');
    var products = [];
    for (var i=0; i < prices.length; ++i) {
        var product = {name: titles[i].innerHTML.trim(),
                       price: standarizePrice(prices[i].innerHTML.trim())};
        products.push(product);
    }
    return products;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  sendResponse(getCartProducts());
});
