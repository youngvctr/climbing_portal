const express = require('express')
const router = express.Router()
const passport = require('passport')

router
    .route('/logout')
    .post(async (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
        })
        req.session.destroy(() => {
            return res.redirect('/')
        })
    })

router
    .route('/login')
    .post(
        passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
        (req, res) => {
            res.status(201).json({ message: 'Login Success', id: req.user.id, username: req.body.username, })
        }
    )

module.exports = router