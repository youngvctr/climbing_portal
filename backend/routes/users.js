const express = require('express')
const router = express.Router()
const { promisePool } = require('../src/db')
const cryptoJS = require('crypto-js')

/** register */
router
    .route('/')
    .get(async (req, res) => {
        res.status(200).json()
    })
    .post(async (req, res) => {
        const today = new Date()

        var unameRegExp = /^[a-zA-z0-9\s]{2,10}$/
        unameRegExp.test(req.body.username) ? console.log('pass') : console.log('Check username validation')

        var pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&\s]{4,15}$/
        pwRegExp.test(req.body.password) ? console.log('pass') : console.log('Check password validation')

        var nameRegExp = /^[a-zA-z가-힣\s]{2,10}$/
        nameRegExp.test(req.body.name) ? console.log('pass') : console.log('Check name validaion')

        var emailRegExp = /^[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*@[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*.[a-zA-Z\s]{2,3}$/i
        emailRegExp.test(req.body.email) ? console.log('pass') : console.log('Check email validation')

        req.body.phone.replace(' ', "")
        var phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/
        phoneRegExp.test(req.body.phone) ? console.log('pass') : console.log('Check phone validation')

        const userInfo = {
            "username": req.body.username.toLowerCase(), // field
            "password": cryptoJS.SHA256( // password 암호화 ; Bcrypt
                req.body.password.toLowerCase(),
                process.env.PASS_SEC
            ).toString(),
            "name": req.body.name,
            "email": cryptoJS.AES.encrypt(
                req.body.email.toLowerCase(),
                process.env.PASS_SEC
            ).toString(),
            "phone": cryptoJS.AES.encrypt(
                req.body.phone,
                process.env.PASS_SEC
            ).toString(),
            "regDatetime": today,
        }

        try {
            const checkNameSQL = `SELECT username FROM user where username='${userInfo.username}';`
            await promisePool.query(checkNameSQL) // DB관련 파트도 분리시킬것.
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
            res.send({
                "code": 500, // http status code ; 생성 성공
                "fail": err.message
            })
        }
    })

router
    .route('/:id')
    .get(async (req, res) => {
    })
    .put(async (req, res) => {
    })

router.put('/:id/password', async (req, res) => {

})

module.exports = router
