'use strict';

const env = {
    jwt: {
        issuer: 'Drawoo.io',
        secret: {
            session: 'e5f2dab8-f153-4bb8-841e-f51dbe99f010',
            email_confirmation: 'a2509f9f-8223-4336-838e-9cb8f070fa10'
        }
    },

    api: {
        meta: {
            name: "drawer_api",
            version: "1.0.0"
        }
    },

    database: {
        host: "localhost",
        database: "drawoo",
        user: "root",
        password: "root"
    }
}

module.exports = env