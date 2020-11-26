const Donations = require('../models/Donation')
const Users = require('../models/User')
const express = require('express');
const isAuth = require('../middlewares/isAuth');
const Donation = require('../models/Donation');
const { route } = require('./users');
const router = express.Router();
const { getOnlineUsers } = require("./utils");


router.post('/create', isAuth, async (req, res) => {
    const { donation } = req.body;
    console.log(donation);
    const d = new Donation(donation);
    const result = await d.save();
    await Users.updateOne({ _id: req.userId }, {
        $push: { donations: d._id },
        $inc: { noDonations: 1 }
    })

    const notification = new Notification({
        notificationType: "donation",
        user: req.userId,
    })
    const t = await notification.save()
    const not = await t.populate({
        path: 'user',
        select: 'avatar name'
    }).execPopulate()

    let onlineUsers = getOnlineUsers();


    const user = await Users.findById(req.userId);
    const followers = user.followers;

    await Promise.all(followers.map(async follower => {
        if (onlineUsers[follower]) {
            await User.findByIdAndUpdate(follower, { $push: { notifications: t } })
            let receiverSocket = onlineUsers[follower];
            receiverSocket.emit('notification', not);
        } else {
            await User.findByIdAndUpdate(follower, { $push: { notifications: t }, $set: { unreadNotifications: true } })
        }
    }))

    console.log('result', user);
    res.status(200).json({
        donation: donation
    })
})

router.get('/recentDonation', isAuth, async (req, res) => {
    try {
        const donations = Donations.find({ donor: req.id }).select('title').limit(3);
        if (donations) {
            console.log(donations)
            res.status(200).json(donations)
        }
        else {
            const err = new Error('No donation made till now!')
            err.statusCode = 404
            throw err
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }

})

router.get('/donations', isAuth, async (req, res, next) => {
    try {
        let {
            location:
            {
                coordinates: [longitude, latitude]
            }
        } = await Users.findById(req.userId).select('location')

        let donations = await Donations.aggregate().
            near({
                near: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                distanceField: 'distance'
            }).sort('distance')

        console.log(donations)
        res.json({
            'donations': donations
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})
router.post('/changeStatus', isAuth, async (req, res, next) => {
    try {
        const { _id, status } = req.body
        if (status == 'pending') {
            // await Donations.updateOne({_id:_id},{
            //     status:status,
            //     receiverId:req.userId,
            //     pickupDate:req.body.date
            // });

            const { donorId } = await Donations.findOneAndUpdate({ _id: _id }, {
                status: status,
                receiverId: req.userId
            });

            const notification = new Notification({
                notificationType: "donation-interest",
                user: req.userId,
            })
            const t = await notification.save()
            const not = await t.populate({
                path: 'user',
                select: 'avatar name'
            }).execPopulate()

            let onlineUsers = getOnlineUsers();
            if (onlineUsers[donorId]) {
                await User.findByIdAndUpdate(donorId, { $push: { notifications: t } })
                let receiverSocket = onlineUsers[donorId];
                receiverSocket.emit('notification', not);
            } else {
                await User.findByIdAndUpdate(donorId, { $push: { notifications: t }, $set: { unreadNotifications: true } })
            }




        }
        else {
            await Donations.updateOne({ _id: _id }, {
                status: status,
                receiverId: req.userId
            });
        }


        res.status(200).json({ 'message': 'changed successfully' })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})
router.post('/accept', isAuth, async (req, res, next) => {
    try {
        console.log('inside the accept')
        const { _id } = req.body
        const { donorId, receiverId } = await Donations.findOneAndUpdate({ _id: _id }, {
            status: 'Accepted',
        });

        const notification = new Notification({
            notificationType: "donation-accept",
            user: receiverId,
        })
        const t = await notification.save()
        const not = await t.populate({
            path: 'user',
            select: 'avatar name'
        }).execPopulate()

        let onlineUsers = getOnlineUsers();
        if (onlineUsers[donorId]) {
            await User.findByIdAndUpdate(donorId, { $push: { notifications: t } })
            let receiverSocket = onlineUsers[donorId];
            receiverSocket.emit('notification', not);
        } else {
            await User.findByIdAndUpdate(donorId, { $push: { notifications: t }, $set: { unreadNotifications: true } })
        }

        res.status(200).json({ 'message': 'changed successfully' })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})
router.post('/reject', isAuth, async (req, res, next) => {
    try {
        const { _id } = req.body
        const { donorId } = await Donations.findOneAndUpdate({ _id: _id }, {
            status: 'NotAccepted',
            receiverId: null
        })

        const notification = new Notification({
            notificationType: "donation-reject",
            user: req.userId,
        })
        const t = await notification.save()
        const not = await t.populate({
            path: 'user',
            select: 'avatar name'
        }).execPopulate()
        console.log("REJECT CALL")
        let onlineUsers = getOnlineUsers();
        if (onlineUsers[donorId]) {
            await User.findByIdAndUpdate(donorId, { $push: { notifications: t } })
            let receiverSocket = onlineUsers[donorId];
            receiverSocket.emit('notification', not);
        } else {
            await User.findByIdAndUpdate(donorId, { $push: { notifications: t }, $set: { unreadNotifications: true } })
        }


        res.status(200).json({ 'message': 'changed successfully' })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})
module.exports = router;