'use strict';

const env = {
    jwt : {
        issuer : 'Drawoo.io',
        secret : {
            key : 'e5f2dab8-f153-4bb8-841e-f51dbe99f010'
        }
    },

    api : {
        meta: {
            name : "drawer_api",
            version : "1.0.0"
        }
    },

    database : {
        host : "localhost",
        name : "drawoo",
        user : "root",
        password  : ""
    }
}

module.exports =  env 