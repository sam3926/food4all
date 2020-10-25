const express = require('express');
const isAuth = require('../middlewares/isAuth');
const User = require('../models/User');
const Post = require('../models/Post');
const { route } = require('./donation');
const router = express.Router();



router.get('/',isAuth, async (req,res) => {
    try{
        let { 
                location:
            {
                coordinates: [longitude,latitude]
            }
        } = await Users.findById(req.id).select('location')

        let posts = await Post.aggregate().
                                near({
                                    near: {
                                        type: 'Point',
                                        coordinates:[longitude,latitude]
                                    },
                                    distanceField: 'distance'
                                }).sort('distance')
        res.json({
            'posts': posts
        })
    } catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
    
})
