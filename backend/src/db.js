const mysql = require('mysql')
require('dotenv').config()

const options = {
    // dotenv 설정
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
}

const connection = mysql.createPool({
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
})

// const connect = connection.connect(async function (err) {
//   if (err) {
//     console.log('!!! Cannot connect !!! Error:')
//     throw err
//   } else {
//     console.log('Connection established.')
//   }
// })

//console.log(connect)
module.exports = { options, connection }
