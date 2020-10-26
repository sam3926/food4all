const express = require('express');
const isAuth = require('../middlewares/isAuth');
const User = require('../models/User');
const Post = require('../models/Post');
const { route } = require('./donation');
const router = express.Router();



router.get('/', isAuth, async (req, res, next) => {
    try {
        let {
            location:
            {
                coordinates: [longitude, latitude]
            }
        } = await Users.findById(req.id).select('location')

        let posts = await Post.aggregate().
            near({
                near: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                distanceField: 'distance'
            }).sort('distance')
        res.json({
            'posts': posts
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

})


router.post('/create', isAuth, async (req, res, next) => {
    try {
        const { post } = req.body;
        const p = new Post({ ...post, authorId: req.userId });
        const result = await p.save();
        console.log(result)
        res.status(201).json(result)

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

module.exports = router