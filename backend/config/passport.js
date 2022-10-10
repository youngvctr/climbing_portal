var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const { promisePool } = require('../src/db')
const cryptoJS = require('crypto-js')
const config = require('../config/config')

module.exports = () => {
    passport.serializeUser((username, done) => {
        return done(null, username)
    });

    passport.deserializeUser((username, done) => {
        return done(null, username)
    });

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        idField: 'id',
        session: true,
        passReqToCallback: false,
    }, async (un, pw, done) => {
        //console.log(un)
        const checkUsername = `SELECT * FROM user WHERE username = ?`
        promisePool.query(checkUsername, un)
            .then((res, rej) => {
                if (rej) { return done(rej) }
                const { id: userId, username, password } = res[0][0]
                if (!username) { return done(null, false, { message: 'Incorrect username or password.' }) }
                const hashedPassword = cryptoJS.SHA256(
                    pw,
                    config.passport.secret
                ).toString()
                try {
                    if (hashedPassword !== password) {
                        return done(null, false, { message: 'Incorrect username or password.' })
                    }
                    return done(null, { id: userId })
                } catch (err) {
                    throw err
                }
            })
    }))

}
