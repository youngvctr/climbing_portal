const mysql = require('mysql2')
require('dotenv').config()

const mysqlConnectionOptions = {
    host: process.env.host,
    port: 3306,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
}

const connection = mysql.createConnection(mysqlConnectionOptions)
connection.connect()

module.exports = { mysqlConnectionOptions, connection }
