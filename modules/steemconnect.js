let steemconnect2 = require('sc2-sdk');
let config = require('../config')

let steemcon = steemconnect2.Initialize({
    app: config.auth.client_id,
    callbackURL: config.auth.redirect_uri ,
   scope: ['login']
});

module.exports = steemcon;