const Donations = require('../models/Donation')
const Users = require('../models/User')
const express = require('express');
const isAuth = require('../middlewares/isAuth');
const Donation = require('../models/Donation');
const { route } = require('./users');
const router = express.Router();

router.post('/create',isAuth, async (req,res) => {
    const {donation} = req.body;
    console.log(donation);
    const d = new Donation(donation);
    const result = await d.save();
    await Users.updateOne({_id:req.userId},{
        $push: {donations:d._id}
    })
    const user = await Users.findById(req.userId);
    console.log('result',user);
    res.status(200).json({
       donation:donation 
    })
})

router.get('/recentDonation',isAuth, async (req,res) => {
    try{
        const donations = Donations.find({donor: req.id}).select('title').limit(3);
        if(donations){
            console.log(donations)
            res.status(200).json(donations)
        }        
        else{
            const err = new Error('No donation made till now!')
            err.statusCode = 404
            throw err
        }
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
    
})

router.get('/donations',isAuth, async(req,res,next) =>{
    try{
        let { 
                location:
            {
                coordinates: [longitude,latitude]
            }
        } = await Users.findById(req.userId).select('location')

        let donations = await Donations.aggregate().
                                near({
                                    near: {
                                        type: 'Point',
                                        coordinates:[longitude,latitude]
                                    },
                                    distanceField: 'distance'
                                }).sort('distance')
        
        console.log(donations)
        res.json({
            'donations': donations
        })
    } catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
})
router.post('/changeStatus',isAuth,async(req,res,next) =>{
    try{
        const { _id,status } = req.body
        await Donations.updateOne({_id:_id},{
            status:status,
            receiverId:req.userId
        });   
        
        res.status(200).json({'message':'changed successfully'})
    } catch(err){
        if(!err.statusCode){
            err.statusCode=500
        }
        next(err)
    }
})
router.post('/reject',isAuth, async(req,res,next) =>{
    try{
        const {_id} = req.body
        await Donations.updateOne({_id:_id},{
            status: 'NotAccepted',
            receiverId: null
        })
        res.status(200).json({'message':'changed successfully'})
    } catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    }
})
module.exports = router;