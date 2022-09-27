const mysql = require('mysql2')
const config = require('../config')
require('dotenv').config()

const mysqlConnectionOptions = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
}

const pool = mysql.createPool(mysqlConnectionOptions)
const promisePool = pool.promise()
//const connection = mysql.createConnection(mysqlConnectionOptions)
//connection.connect()

module.exports = { mysqlConnectionOptions, pool, promisePool }
