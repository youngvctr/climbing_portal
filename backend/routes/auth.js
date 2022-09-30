const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const config = require('../config/config')
const cryptoJS = require('crypto-js')
const { promisePool } = require('../src/db')

router
    .route('/logout')
    .post(async (res, req, next) => {
        // req.logout(function (err) {
        //     if (err) { return next(err); }
        //     res.redirect('/');
        // });
    })

router
    .route('/login')
    .post(async (req, res) => {
        var post = req.body
        const username = post.username
        const password = post.password
        //console.log(post)
        try {
            const checkNameSQL = `SELECT username, password FROM user where username='${username}';`
            console.log(checkNameSQL)
            await promisePool.query(checkNameSQL, username)
                .then((response, reject) => {
                    const hashedPassword = cryptoJS.SHA256(
                        password,
                        config.passport.secret
                    ).toString()
                    const reqPassword = (response[0][0].password).toString()
                    if (hashedPassword !== reqPassword) {
                        console.log('Login was wrong')
                        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
                        return res.status(401).json('Wrong credentials!')
                    } else {
                        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
                        return res.status(201).json('Login Success')
                    }
                })
        } catch (e) {
            throw e.message
        }
    })

module.exports = router