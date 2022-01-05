// keys.js - Determines the credentials to return

if( process.env.NODE_ENV === 'production' )
{
    module.exports = require( './prod');
}
else
{
    /* Pull in local dev keys and make available */
    module.exports = require('./dev');
}

