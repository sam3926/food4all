const express = require('express');
const isAuth = require('../middlewares/isAuth');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
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
        const c = new Comment({postId: p._id});
        const commentResult = await c.save();
        console.log(result,commentResult)
        res.status(201).json({
            'post':result,
            'comment':commentResult
        })

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

router.post('/like',isAuth, async(req,res,next)=>{
    try {
           await Post.updateOne({authorId:req.authorId},{
               noOfLikes: noOfLikes+ req.body.value,
               $push: {likes:req.id}
           })
           const post = await Post.find({authorId:req.body.authorId})

           console.log(post)
        res.json({
            'message': 'updated the like'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

})
module.exports = router