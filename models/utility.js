
/*
 * @PARAMS string <string> : String to validate | type <string> : What is this string? | callback
 * @RETURN valid <boolean> : Is the string valid?
 * @DESCRIPTION Perform regex on string to verify input is valid.
 */
 //@TODO Proper regex validation
exports.validate = function (string, type) {
    switch (type) {
        case 'uuid':

            break;
        case 'apiKey':
            string.search('regex')
            if (valid) {
                return String(comm[type]);
            } else {
                return false;
            }
            break;
        case 'currency':

            break;
        default:

    }
};

exports.printTime = function () {
    var date = new Date();
    var format = date.toLocaleTimeString();
    console.log(format);
};

exports.print = function (message, type, debug) {
    if(type === 'debug' && debug){
        console.log('DEBUG MODE: ', message + '\n\n');
        console.log('-------------------------------------------------------------------\n\n');
    } else {
        console.log(message + '\n\n');
        console.log('-------------------------------------------------------------------\n\n');
    }
};
