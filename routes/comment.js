const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/User");
const Comment = require('../models/Comment')
const isAuth = require("../middlewares/isAuth");
const isOrg = require("../middlewares/isOrg");

router.get('/:id',isAuth,async (req,res,next)=>{
    try{
            const comment = await Comment.find({postId:req.params.id});
            console.log(comment)
            res.status(200).json(comment)
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
})
router.post('/add/:id',isAuth, async (req,res,next)=>{
    try {
                const user = await User.findById(req.id);
                const utcDate = new Date(Date.now())
                await Comment.updateOne({_id:req.params.id},{
                    $push:{comments:{
                        author:req.id,
                        avatar:user.avatar,
                        content:req.body.content,
                        datatime:utcDate.toUTCString()        
                    }}
                })

                const comment = await Comment.findById(req.params.id)
                console.log(comment)

                res.status(200).json(comment)

    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    }
})
module.exports = router