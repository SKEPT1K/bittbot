# bittbot

## Description
bittbot is a simple bot for interacting with the Bittrex cryptocurrency exchange.  While a wrapper for the Bittrex API is provided, it is recommended to modify the implementation to suit your needs.

## Disclaimer
This is a project FOR FUN that does NOT guarentee any types of gains.  Use at your own risk!

## Install
1. `git clone git@github.com:SKEPT1K/bittbot.git && cd bittbot`
2. `npm install`
3. `node app.js -h`

### Usage
`node app.js [options]`

#### Options
```
-V, --version            : Output the version number
    --sPrice <ticker>    : Get the current price for a single currency.
    --balance <ticker>   : Get account balance of specified currency.
    --refresh <minutes>  : Set the time inbetween actions (in minutes, must be greater than 1).
    --routine <routine>  : Specify a routine for the bot to run.
    --instant            : !!DANGER!! Forces the bot to run without a delay threshold
    --noob               : Run the interactive setup. (Not yet implemented)
    -h, --help           : output usage information
```
<b> WARNING: </b> Per Bittrex's API documentation, a timeout of 1 minute (or greater) is recommended for performing actions.  Any less may result in a throttling/deactivation of your API key.  Please use caution when using the `--instant` flag.

## Routines
A routine is any valid javascript file accompanied by a configuration file.  This is where any buy/sell logic is defined.  As this is where money made/lost, only a template has been included for reference.

### Creating a Routine
Simply add a set of `.js` and `.json` files (please ensure the names match).  While the routine may contain any valid javascript, a configuration file is required for any value that may be changed in the future.

### Running a Routine
```
node app.js --routine <routine>

ex. node app.js --routine template
```
