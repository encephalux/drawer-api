const mysql2 = require('mysql2/promise')
const env = require('../env')

module.exports = () => mysql2.createConnection({
    host: env.database.host,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name
});
