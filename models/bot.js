var request  = require('request');
var Account  = require('./account');
var Market   = require('./market');
var Utility  = require('./utility');

exports.init = function (baseUrl, authParameters, refresh, routineName) {
    try {
        var routine   = require(`./routines/${routineName}.json`);
        var routineJS = require(`./routines/${routineName}.js`);

        exports.parse(baseUrl, authParameters, refresh, routine.routine);
    } catch (e) {
        console.log("Failed to load: " + routine + "\n\n");
        process.exit(1);
    }
};

exports.parse = function (baseUrl, authParameters, refresh, routine) {
    var params = {};
    params.baseUrl        = baseUrl;
    params.authParameters = authParameters;
    params.refresh        = refresh;
    params.routine        = routine;

    /* Run the routine at specified interval. */
    setInterval(function() {
        exports.beginRoutine(params);
    }, refresh);
};

exports.beginRoutine = function (params) {
    var routine = params.routine;
    Utility.print("Routine " + routine.metadata.name + " started.", false, false);

    /* Start to filter through parameters. */
    //@TODO At first assume we want to buy/sell, so assume we have inWallet and inMarket
    if (routine.currency && routine.currency.inWallet && routine.currency.inMarket) {
        Account.getBalance(params.baseUrl,
        params.authParameters,
        routine.currency.inWallet,
        function (err, totalBalance, available) {
            if (err) {
                console.log("ROUTINE FAILURE: Error getting balance.");
                Utility.print(err, false, false);
            } else {
                if (available) {
                    Market.sPrice(params.baseUrl, routine.currency.inMarket, function (err, totalPrice){
                        if (err) {
                            console.log("ROUTINE FAILURE: Error getting ticker.");
                            Utility.print(err, false, false);
                        } else {
                            var marketPrice = totalPrice.ask;

                            /* Run the specified routine. */
                            routineJS.init(params);
                        }
                    });
                }
            }
        });
    }
};
