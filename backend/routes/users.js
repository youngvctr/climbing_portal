const express = require('express')
const router = express.Router()
const { promisePool } = require('../src/db')
const cryptoJS = require('crypto-js')
const config = require('../config/config')

/** register */
router
    .route('/')
    .get(async (req, res) => {
        res.status(200).json()
    })
    .post(async (req, res) => {
        const today = new Date()

        const unameRegExp = /^[a-zA-z0-9\s]{2,10}$/
        unameRegExp.test(req.body.username) ? console.log('pass') : console.log('Check username validation')

        const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&\s]{4,15}$/
        pwRegExp.test(req.body.password) ? console.log('pass') : console.log('Check password validation')

        const nameRegExp = /^[a-zA-z가-힣\s]{2,10}$/
        nameRegExp.test(req.body.name) ? console.log('pass') : console.log('Check name validaion')

        const emailRegExp = /^[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*@[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*.[a-zA-Z\s]{2,3}$/i
        emailRegExp.test(req.body.email) ? console.log('pass') : console.log('Check email validation')

        req.body.phone.replace(' ', "")
        const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/
        phoneRegExp.test(req.body.phone) ? console.log('pass') : console.log('Check phone validation')

        const userInfo = {
            "username": req.body.username.toLowerCase(), // field
            "password": cryptoJS.SHA256( // password 암호화 ; Bcrypt
                req.body.password.toLowerCase(),
                config.passport.secret
            ).toString(),
            "name": req.body.name,
            "email": cryptoJS.AES.encrypt(
                req.body.email.toLowerCase(),
                config.passport.secret
            ).toString(),
            "phone": cryptoJS.AES.encrypt(
                req.body.phone,
                config.passport.secret
            ).toString(),
            "regDatetime": today,
        }

        try {
            const checkNameSQL = `SELECT username FROM user where username= ?`
            await promisePool.query(checkNameSQL, userInfo.username) // DB관련 파트도 분리시킬것.
                .then((response, reject) => {
                    if (!response[0].length) {
                        try {
                            const sql = `INSERT INTO user SET ?` //sql 표준문법; INSERT INTO table (a, b, c) VALUES (1,2,3) 
                            promisePool.query(sql, userInfo)
                            //promisePool.end()
                            console.log(`Form submitted successfully.`)
                            res.status(201).json({ "success": `register is successful` })
                        } catch (err) {
                            //console.log(err)
                            res.status(500).json({ "failed": err.message })
                        }
                    }
                    else {
                        res.status(400).json({ "fail": `username을 확인해주세요. or ${reject}` })
                    }
                })
            //console.log(rows)//rows[0].username)
        } catch (err) {
            res.status(500).json({ "fail": `${reject}` })
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            //const username = username 
            const checkNameSQL = `SELECT username, password, name, email, phone FROM user where username=?`
            console.log(checkNameSQL)
            await promisePool.query(checkNameSQL, username)
                .then((response, reject) => {
                    const userInfo = {
                        "username": response[0][0].username, // field
                        "password": response[0][0].password,
                        "name": response[0][0].name,
                        "email": cryptoJS.AES.decrypt(
                            response[0][0].email,
                            config.passport.secret
                        ).toString(),
                        "phone": cryptoJS.AES.decrypt(
                            response[0][0].phone,
                            config.passport.secret
                        ).toString(),
                    }
                    console.log(userInfo.username, userInfo.name, userInfo.email, userInfo.phone)
                    return res.status(200).json()
                })
        } catch (e) {
            throw e.message
        }
    })
    .put(async (req, res) => {
        try {
            const updateUserSQL = 'UPDATE user SET name = ?, email = ?, phone = ? WHERE username = ?'
            console.log(updateUserSQL)
            await promisePool.query(updateUserSQL, [body.name, body.email, body.phone, body.username])
            return res.status(201).json({ "success": `User information is updated!` })
        } catch (e) {
            throw e.message
        }
    })

router.put('/:id/password', async (req, res) => {
    const { currentPassword, newPassword } = req.body
    try {
        // current password
        const hashedPassword = cryptoJS.SHA256(
            currentPassword,
            config.passport.secret
        ).toString()
        const checkPwSQL = `SELECT password FROM user where password='${hashedPassword}';`
        console.log(checkPwSQL)
        await promisePool.query(checkPwSQL, hashedPassword)
            .then((response, reject) => {
                if (!response[0]) {
                    console.log('Password was wrong')
                    return res.status(401).json('Password was wrong') // frontend에 넘겨줄 json형식 데이터
                }
            })
    } catch (e) {
        throw e.message
    }
    // update password
    try { //new password
        const changedPw = cryptoJS.SHA256(newPassword.toLowerCase(), config.passport.secret).toString()
        const updatePwSQL = 'UPDATE user SET password = ? WHERE username = ?'
        console.log(updatePwSQL)
        await promisePool.query(updatePwSQL, [changedPw, body.username])
        return res.status(201).json({ "success": `Password is updated!` })
    } catch (e) {
        throw e.message
    }
})

module.exports = router
