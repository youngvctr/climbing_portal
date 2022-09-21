const express = require('express')
const router = express.Router()

/* Main page */
router.get('/', async (req, res) => {
    try {
        let message = 'complete!';
        if (req.session && req.session.sessionTest) {
            message += ', true';
        }
        res.send(message);
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(400).json()
    }
})

router.get('/test', (req, res) => {
    req.session.sessionTest = true;
    res.redirect('/')
})

module.exports = router
