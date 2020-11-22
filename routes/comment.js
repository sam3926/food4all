const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require('../models/Comment')
const isAuth = require("../middlewares/isAuth");
const isOrg = require("../middlewares/isOrg");
const { getOnlineUsers } = require("./utils");


router.get('/:id', isAuth, async (req, res, next) => {
    try {
        const comment = await Comment.find({ postId: req.params.id });
        console.log(comment)
        res.status(200).json(comment)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})
router.post('/add/:id', isAuth, async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        const utcDate = new Date(Date.now())
        await Comment.updateOne({ postId: req.params.id }, {
            $push: {
                comments: {
                    author: user.name,
                    avatar: user.avatar,
                    content: req.body.content,
                    datatime: utcDate.toUTCString()
                }
            }
        })

        const post = await Post.findById(req.params.id).select('authorId')

        const notification = new Notification({
            notificationType: "comment",
            user: req.userId,
        })
        const t = await notification.save()
        const not = await t.populate({
            path: 'user',
            select: 'avatar name'
        }).execPopulate()

        let onlineUsers = getOnlineUsers();
        if (onlineUsers[post.authorId]) {
            await User.findByIdAndUpdate(post.authorId, { $push: { notifications: t } })
            let receiverSocket = onlineUsers[post.authorId];
            receiverSocket.emit('notification', not);
        } else {
            await User.findByIdAndUpdate(post.authorId, { $push: { notifications: t }, $set: { unreadNotifications: true } })
        }


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