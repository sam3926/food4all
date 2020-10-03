const express = require('express')

const isAuth = require('../middlewares/isAuth');

const router = express.Router();

// router.put('/register', signup)
// router.post('/login', login)

//For all authenticated routes , add the isAuth middleware
router.post('/secret', isAuth, (req, res) => {
    res.send("heyyy u paassed")
})

module.exports = router