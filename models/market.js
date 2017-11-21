var request  = require('request');

/*
 * @PARAMS baseUrl <string> : URL of the target API. | sPrice <string> : Ticket symbol. | callback : Callback to routes in cli.js.
 * @RETURN err <boolean> : Was there an error? | price <object> : Price information for a single currency;
 * @DESCRIPTION Get the price of a single currency.
 */
exports.sPrice = function (baseUrl, sPrice, callback) {
    /* This is a PUBLIC query, authParameters are not required. */
    var fullUrl = baseUrl + 'public/getticker?market=' + sPrice;
    request(fullUrl, function(err, res, body) {
        var body = JSON.parse(body);
        console.log("Fetching price for: " + sPrice + "\n");
        if (err || body.success === false) {
            callback(body.message, null);
    } else if (!err && body && res.statusCode == 200) {
            var price = body;
            price = price.result;
            callback(false, price);
        }
    });
};

exports.addOrder = function (baseUrl, authParameters, inMarket, amount, type, callback) {
    /* This is a PUBLIC query, authParameters are not required. */
    var fullUrl = baseUrl + 'market/buylimit?'
                          + authParameters
                          + '&market=' + inMarket + '&quantity=' + amount + '&rate=1.3 ';

    request(fullUrl, function(err, res, body) {
        var body = JSON.parse(body);
        if (err || body.success === false) {
            callback(body.message);
    } else if (!err && body && res.statusCode == 200) {
            callback(false);
        }
    });
};
