const express = require('express')
const router = express.Router()
const { connection } = require('../src/db')
const cryptoJS = require('crypto-js')

/** register */
/**
 * password ; 단방향 암호화
 * email, phone ; 양방향 암호화
 */
router
    .route('/register')
    .get(async (req, res) => {
        res.status(200).json()
    })
    .post(async (req, res) => {
        const today = new Date()

        var unameRegExp = /^[a-zA-z0-9\s]{2,10}$/
        unameRegExp.test(req.body.username) ? console.log('pass') : console.log('Check username validation')

        var pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&\s]{4,15}$/
        pwRegExp.test(req.body.password) ? console.log('pass') : console.log('Check password validation')

        var nameRegExp = /^[a-zA-z\s]{2,10}$/
        nameRegExp.test(req.body.name) ? console.log('pass') : console.log('Check name validaion')

        var emailRegExp = /^[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*@[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*.[a-zA-Z\s]{2,3}$/i
        emailRegExp.test(req.body.email) ? console.log('pass') : console.log('Check email validation')

        var phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/
        phoneRegExp.test(req.body.phone) ? console.log('pass') : console.log('Check phone validation')
        req.body.phone.replace(' ', "")

        const userInfo = {
            "username": req.body.username, // field
            "password": cryptoJS.SHA512( // password 암호화 ; Bcrypt
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
            "name": req.body.name,
            "email": cryptoJS.AES.encrypt(
                req.body.email,
                process.env.PASS_SEC
            ).toString(),
            "phone": cryptoJS.AES.encrypt(
                req.body.phone,
                process.env.PASS_SEC
            ).toString(),
            "regDatetime": today,
        }

        //console.log(userInfo)

        try {
            const checkName = `SELECT username FROM user`
            const result = connection.query(checkName, userInfo.username,
                function (err, results, fields) {
                    if (err) {
                        res.send({
                            "code": 500,
                            "failed": "Internal Server Error"
                        })
                    } else {
                        console.log(fields)
                        res.send({
                            "code": 201, // http status code ; 생성 성공
                            "success": results
                        })
                    }
                })

            if (!result) {
                const sql = `INSERT INTO user SET ?` //sql 표준문법; INSERT INTO table (a, b, c) VALUES (1,2,3) 
                connection.query(sql, newUser, // mysql용 확장형 sql문법
                    function (error, results, fields) {
                        if (error) {
                            res.send({
                                "code": 500,
                                "failed": `Internal Server Error; ${results}`
                            })
                        } else {
                            res.send({
                                "code": 201, // http status code ; 생성 성공
                                "success": `register is successful; ${results}`
                            })
                        }
                    })
                console.log(`Form submitted successfully.`)
            } else {
                console.log('username을 확인해주세요.')
            }
        } catch (err) {
            console.log(err)
            res.send({
                "code": 500,
                "failed": err.message
            })
        }
    })

router.get('/test', (req, res) => {
    req.session.sessionTest = true;
    res.redirect('/')
})

module.exports = router
