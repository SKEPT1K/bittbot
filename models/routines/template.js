var request  = require('request');
var Account  = require('../account');
var Market   = require('../market');
var Utility  = require('../utility');

/*
 * Template demonstrating a simple buy/sell script.
 * BUY @ <= price
 * SELL @ >= price
 */
exports.init = function (params) {
    var routine = params.routine;

    if (marketPrice <= routine.directives.purchase.price) {
        Market.addOrder(params.baseUrl,
        params.authParameters,
        routine.currency.inMarket,
        routine.directives.purchase.amount, "buylimit", function (err) {
            if (err) {
                console.log("buylimit with the amount: " + routine.directives.purchase.amount + " failed.");
                console.log(err + "\n\n");
            } else {
                console.log("buylimit with the amount: " + routine.directives.purchase.amount + " executed.\n\n");
            }
            Utility.print();
        });
    }

    if (marketPrice >= routine.directives.sell.price) {
        Market.addOrder(params.baseUrl,
        params.authParameters,
        routine.currency.inMarket,
        routine.directives.sell.amount, "selllimit", function (err) {
            if (err) {
                console.log("selllimit with the amount: " + routine.directives.sell.amount + " failed.");
                console.log(err + "\n\n");
            } else {
                console.log("selllimit with the amount: " + routine.directives.sell.amount + " executed.\n\n");
            }
            Utility.print();
        });
    }
};
