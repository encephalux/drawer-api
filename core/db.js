const mysql2 = require('mysql2')
const env = require('../env')
const pool = mysql2.createPool({
   
        host : env.database.host,
        user :env.database.user,
        password : env.database.password,
        database : env.database.name
  
})


module.exports = pool