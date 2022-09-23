const MySQLStore = require('express-mysql-session')
const mysql = require('mysql2')
require('dotenv').config()

const mysqlConnectionOptions = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
}

const pool = mysql.createPool(mysqlConnectionOptions)
const promisePool = pool.promise()
//const connection = mysql.createConnection(mysqlConnectionOptions)
//connection.connect()

module.exports = { mysqlConnectionOptions, pool, promisePool }
