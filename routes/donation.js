const Donations = require('../models/donations')
const express = require('express');
const router = express.Router();

router.post('/create', (req,res) => {
    return res.status(400).json({cool: "cool"})
})

module.exports = router;