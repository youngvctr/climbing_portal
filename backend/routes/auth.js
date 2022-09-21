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
        return res.status(200).json()
    })
    .post(async (req, res) => {
        const today = new Date()
        const newUser = {
            "username": req.body.username,
            "password": cryptoJS.AES.encrypt(
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

        console.log(newUser)

        return new Promise((resolve, reject) => {
            try {
                const checkName = `SELECT username FROM user`
                const result = connection.query(checkName, newUser.username,
                    function (error, results, fields) {
                        if (error) {
                            res.send({
                                "code": 400,
                                "failed": "error ocurred"
                            })
                        } else {

                        }
                    })
                console.log('username을 확인해주세요.')
                if (!result) {
                    const sql = `INSERT INTO user SET ?`
                    connection.query(sql, newUser,
                        function (error, results, fields) {
                            if (error) {
                                res.send({
                                    "code": 400,
                                    "failed": "error ocurred"
                                })
                            } else {
                                res.send({
                                    "code": 200,
                                    "success": "register is successful"
                                })
                            }
                        })
                    console.log(`Form submitted successfully.`)
                }
            } catch (err) {
                console.log(err)
            }
        })
    })

router.get('/test', (req, res) => {
    req.session.sessionTest = true;
    res.redirect('/')
})

module.exports = router
