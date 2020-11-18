const express = require('express');
const isAuth = require('../middlewares/isAuth');
const User = require('../models/User');
const Post = require('../models/Post');
const Event = require('../models/Event');
const Comment = require('../models/Comment');
const { route } = require('./donation');
const router = express.Router();

router.get('/',isAuth,async (req, res, next) => {
    try {
        const events = await Event.find({}).limit(20);
        res.json({events:events});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})
router.post('/create', isAuth, async (req, res, next) => {
    try {
        const { event } = req.body;
        const e = new Event(event);
        await e.save();
        console.log(e);
        res.json({event:e});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

module.exports = router;