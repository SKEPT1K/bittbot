var comm     = require('commander');
var request  = require('request');
var config   = require('config');
var inquirer = require('inquirer');

/* Custom Models. */
var Utility = require('./utility');
var Market  = require('./market');
var Account = require('./account');
var Bot     = require('./bot');



/*
 * @PARAMS options <object> : Taken from [env].json | callback : Return to app.js.
 * @RETURN started <boolean> : Did the bot start? | console.log <string> : List the accepted parameters. | comm <object> : cli app.
 * @DESCRIPTION Initiate the command line app.
 */
exports.init = function (options, callback) {
    /* Set accepted parameters. */
    try {
        comm
            .version('0.0.1')
            .option('--sPrice <ticker>', 'Get the current price for a single currency.')
            .option('--balance <ticker>', 'Get account balance of specified currency.')
            .option('--refresh <minutes>', 'Set the time inbetween actions (in minutes, must be greater than 1).')
            .option('--routine <routine>', 'Specify a routine for the bot to run.')
            .option('--instant', '!!DANGER!! Forces the bot to run without a delay threshold')
            .option('--noob', 'Run the interactive setup. (Not yet implemented)')
            .parse(process.argv)

        if (comm) {
            callback(true, "Bot started successfully!\n", comm);
        }
    } catch (e){
        callback(false, "Bot failed to start!\n", false);
    }
};

/*
 * @DESCRIPTION Print messages at startup.
 */
exports.printIntro = function () {
    console.log('\n\n');
    console.log('Happy investing :)');
    // Show some text in the console with red Color
    console.log('Made with love, by Anthony\n\n');
    Utility.print("", false, false);
};

/*
 * @PARAMS comm <object> : cli app.
 * @DESCRIPTION Parse parameters and typecheck.
 */
exports.parse = function (comm) {
    var params = {};
    /* If interactive setup is used, parse those values here. */
    if (comm.noob) {

    } else {
        /* Force type conversion and validate input. */
        // Should this be paralleled?
        params.apiKey         = config.get('env.options.apiKey'); //Utility.validate(String(config.get('env.options.apiKey')), "apiKey");
        params.apiSecret      = config.get('env.options.apiSecret');
        params.nonce          = Math.floor(new Date().getTime() / 1000);
        params.baseUrl        = config.get('env.options.baseUrl');
        params.authParameters = "apikey=" + params.apiKey + "&nonce=" + params.nonce;
        params.sPrice         = comm.sPrice; //Utility.validate(String(comm.sPrice), "sPrice");
        params.balance        = comm.balance;
        params.routine        = comm.routine;

        if (comm.refresh >= 1 && !comm.instant) {
            comm.refresh = Number(comm.refresh) * 60000;
        } else if (comm.instant) {
            comm.refresh = 5000;
        } else {
            comm.refresh = 60000;
        }

        params.refresh        = comm.refresh;
    }

    /* Initiate program flow. */
    if (params) {
        exports.route(params, comm);
    }
};

/*
 * @PARAMS params <object> : Include runtime parameters | comm <object> : cli app.
 * @DESCRIPTION Direct program flow based on parameters.
 */
exports.route = function (params, comm) {
    /* Optional attributes. */
    var refresh = params.refresh;
    Utility.print("The bot will run the specified commands every " + refresh/60000 + " minute(s).", false, false);

    var sPrice  = params.sPrice || false;
    var routine = String(params.routine) || false;

    /* Begin routes. */
    //@TODO: Doesn't return price data with symbols other than BTC-XRP.
    if (sPrice) {
        setInterval(function() {
            Market.sPrice(params.baseUrl, sPrice, function(err, price) {
                Utility.printTime();
                if (err) {
                    Utility.print("Error fetching price!", false, false);
                } else {
                    for (var value in price) {
                        console.log(`${value} = ${price[value]}`);
                    }
                Utility.print("", false, false);
                }
            });
        }, refresh);
    }

    /* Used when the --balance command is issued. */
    var balance = params.balance || false;
    if (balance) {
        Account.getBalance(params.baseUrl, params.authParameters, balance, function(err, balance, available) {
            Utility.printTime();
            if (err) {
                Utility.print("Error fetching account balance!", false, false);
            } else {
                for (var value in balance) {
                    console.log(`${value} = ${balance[value]}\n\n`);
                }
            Utility.print("", false, false);
            }
        });
    }

    /* Load a routine.json for the bot to follow. */
    if (routine && routine != "undefined") {
        Bot.init(params.baseUrl, params.authParameters, refresh, routine);
    }
};
