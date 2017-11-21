var config		= require('config');
var bodyParser	= require('body-parser');
var express	    = require('express');
var cli         = require('./models/cli');
var app			= express();

/* Initiate the bot. */
var options = config.get('env.options') || [];
cli.init(options, function(started, msg, comm){
    if (started && comm){
        cli.printIntro();
        cli.parse(comm);
    } else {
        console.log(msg);
        process.exit(1);
    }
});
