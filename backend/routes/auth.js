const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const config = require('../config/config')

router.route('/logout').get(async (res, req) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.redirect('/')
})

router
    .route('/login')
    .post(async (res, req) => {
        var post = req.body
        var username = post.username
        var password = post.password

        const checkNameSQL = `SELECT username FROM user where username='${username}';`

        await promisePool.query(checkNameSQL)
            .then((response, reject) => {
                if (response[0].length) {
                    const hashedPassword = cryptoJS.SHA256.decrypt(
                        password,
                        config.passport.secret
                    ).toString(cryptoJS.enc.Utf8)

                    if (hashedPassword !== req.body.password) {
                        console.log('Login was wrong')
                        passport.autheticate('local', { successRedirect: '/', failureRedirect: '/login' })
                        return res.status(401).json('Wrong credentials!')
                    } else {
                        passport.autheticate('local', { successRedirect: '/', failureRedirect: '/login' })
                        return res.status(201).json('Login Success')
                    }
                }
            })
    })