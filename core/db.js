const mysql2 = require('mysql2/promise');
const env = require('../env');

module.exports = () => mysql2.createConnection(env.database);
