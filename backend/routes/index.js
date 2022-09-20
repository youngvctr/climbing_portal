const express = require('express')
const router = express.Router()

/* Main page */
router.get('/', async (req, res) => {
    try {
        console.log(`index`)
        return res.status(200).json()
    } catch (err) {
        console.log(err)
        return res.status(400).json()
    }
})

module.exports = router
