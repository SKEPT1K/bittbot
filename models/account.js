var request  = require('request');

exports.getBalance = function (baseUrl, authParameters, currency, callback) {
    currency = currency || 'BTC';
    var fullUrl = baseUrl + 'account/getbalances?' + authParameters + '&currency=' + currency;
    request(fullUrl, function(err, res, body) {
        var body = JSON.parse(body);
        if (err || body.success === false) {
            callback(body.message, null, null);
    } else if (!err && body && res.statusCode == 200) {
            var available = body.result.available;
            var balance = body.result;
            callback(false, balance, available);
        }
    });
};
