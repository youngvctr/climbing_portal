const express = require('express')
const router = express.Router()
const { promisePool } = require('../src/db')
const cryptoJS = require('crypto-js')
const config = require('../config/config')
const validation = require('../config/validation')

/** register */
router
    .route('/')
    .get((req, res) => {
        res.status(200).json({ message: "Join. π" })
    })
    .post(async (req, res) => {
        const today = new Date()
        //console.log(req.body)
        const { username, password, name, email, phone } = validation(req)
        const userInfo = {
            username: username.toLowerCase(), // field
            password: cryptoJS.SHA256( // password μνΈν ; Bcrypt
                password.toLowerCase(),
                config.passport.secret
            ).toString(),
            name: name,
            email: cryptoJS.AES.encrypt(
                email.toLowerCase(),
                config.passport.secret
            ).toString(),
            phone: cryptoJS.AES.encrypt(
                phone,
                config.passport.secret
            ).toString(),
            regDatetime: today,
        }

        try {
            const checkNameSQL = `SELECT username FROM user where username= ?`
            promisePool.query(checkNameSQL, userInfo.username) // DBκ΄λ ¨ ννΈλ λΆλ¦¬μν¬κ².
                .then((resolve, reject) => {
                    if (!resolve[0].length) {
                        try {
                            const sql = `INSERT INTO user SET ?` //sql νμ€λ¬Έλ²; INSERT INTO table (a, b, c) VALUES (1,2,3) 
                            promisePool.query(sql, userInfo)
                        } catch (err) {
                            res.status(500).json({ message: err.message })
                        }
                    }
                    else {
                        res.status(400).json({ message: `Please check username. π` })
                    }
                })
                .then(() => {
                    const searchNameSQL = `SELECT username FROM user where username= ?`
                    promisePool.query(searchNameSQL, userInfo.username)
                        .then((resolve, reject) => {
                            if (resolve[0][0].username === userInfo.username) {
                                res.status(201).json({ message: 'Join was successful. π' })
                            } else {
                                res.status(500).json({ message: 'Join was fail. π²' })
                            }
                        })
                })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            const id = req.body.id
            const checkNameSQL = `SELECT username, password, name, email, phone FROM user where id=?`
            await promisePool.query(checkNameSQL, id)
                .then((response, reject) => {
                    const { username, password, name, email, phone } = response[0][0]
                    const userInfo = {
                        username: username, // field
                        password: password,
                        name: name,
                        email: cryptoJS.AES.decrypt(
                            email,
                            config.passport.secret
                        ).toString(),
                        phone: cryptoJS.AES.decrypt(
                            phone,
                            config.passport.secret
                        ).toString(),
                    }

                    return res.status(200).json({ username: userInfo.username, name: userInfo.name, email: userInfo.email, phone: userInfo.phone })
                })
        } catch (e) {
            throw e.message
        }
    })
    .put(async (req, res) => {
        try {
            const id = req.body.id
            const updateUserSQL = 'UPDATE user SET name = ?, email = ?, phone = ? WHERE id = ?'
            const { username, name, email, phone } = validation(req)
            const userInfo = {
                username: username, // field
                name: name,
                email: cryptoJS.AES.encrypt(
                    email,
                    config.passport.secret
                ).toString(),
                phone: cryptoJS.AES.encrypt(
                    phone,
                    config.passport.secret
                ).toString(),
            }

            promisePool.query(updateUserSQL, [userInfo.name, userInfo.email, userInfo.phone, id])
            return res.status(200).json({ message: `User information is updated. π` })
        } catch (err) {
            throw err.message
        }
    })

router.put('/:id/password', async (req, res) => {
    const { currentPassword, newPassword, id } = req.body
    try {
        // current password
        const hashedPassword = cryptoJS.SHA256(
            currentPassword.toLowerCase(),
            config.passport.secret
        ).toString()
        const checkPwSQL = `SELECT password FROM user WHERE id=?`
        promisePool.query(checkPwSQL, id)
            .then((response, reject) => {
                console.log(response[0][0].password)
                console.log(hashedPassword)
                if (response[0][0].password === hashedPassword) {
                    try { //new password
                        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&\s]{4,15}$/
                        pwRegExp.test(newPassword) ? console.log('pass') : console.log('Check password validation')
                        const changedPw = cryptoJS.SHA256(newPassword.toLowerCase(), config.passport.secret).toString()
                        const updatePwSQL = 'UPDATE user SET password = ? WHERE id = ?'
                        //console.log(updatePwSQL)
                        promisePool.query(updatePwSQL, [changedPw, id])
                        return res.status(201).json({ message: `Password is updated. π` })
                    } catch (err) {
                        return res.status(500).json({ message: `Password update was fail. π`, err })
                    }
                } else {
                    return res.status(400).json({ message: 'Password was wrong. π' }) // frontendμ λκ²¨μ€ jsonνμ λ°μ΄ν°
                }
            })
    } catch (e) {
        throw e.message
    }
})

module.exports = router
