const express = require('express');
const Thread = require('../models/Thread');
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const User = require('../models/User');
const { getOnlineUsers } = require('./utils');


router.get("/getThreads", isAuth, async (req, res, next) => {
    try {
        const { threads } = await User.findById(req.userId).select('threads').populate({
            path: 'threads',
            populate: {
                path: 'members',
                model: 'User',
                select: 'name avatar description'
            }
        }).sort({ 'updatedAt': -1 })
        res.status(200).json(threads)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

});


router.post("/send", isAuth, async (req, res, next) => {
    try {
        const { threadId, body, type } = req.body;
        const thread = await Thread.findByIdAndUpdate(threadId, {
            $push: {
                messages: {
                    body: body,
                    type: type,
                    sender: req.userId
                }
            }
        }, { new: true }).populate({
            path: 'members',
            model: 'User',
            select: 'name avatar description'
        })

        let receiver = thread.members.find(x => x._id != req.userId)
        let onlineUsers = getOnlineUsers();
        if (onlineUsers[receiver._id]) {
            console.log("user online")
            let receiverSocket = onlineUsers[receiver._id];
            receiverSocket.emit('output_message', thread);
        } else {
            console.log("user not online", Object.keys(onlineUsers))
            console.log("receiver", receiver)

        }

        res.status(200).json(thread)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

router.post("/new-thread", isAuth, async (req, res, next) => {
    try {
        const { receiver } = req.body;
        const newthread = new Thread({
            members: [req.userId, receiver],
            messages: []
        })
        const thread = await newthread.save();
        await thread.populate({
            path: 'members',
            model: 'User',
            select: 'name description avatar'
        }).execPopulate()
        console.log(thread)
        await User.findByIdAndUpdate(req.userId, { $push: { threads: thread._id } })
        await User.findByIdAndUpdate(receiver, { $push: { threads: thread._id } })
        res.status(200).json(thread)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

module.exports = router;