const Donations = require('../models/Donation')
const Users = require('../models/User')
const express = require('express');
const isAuth = require('../middlewares/isAuth');
const User = require('../models/User');
const router = express.Router();

router.post('/create', (req,res) => {
    return res.status(400).json({cool: "cool"})
})
// GET /donation/:id - fetch the donation based on the distance from the location of the user
// donations: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Donation'
//   }]
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
router.get('/donations',isAuth, async(req,res) =>{
    try{
        let { 
                location:
            {
                coordinates: [longitude,latitude]
            }
        } = await Users.findById(req.id).select('location')

        let donations = await Donations.aggregate().
                                near({
                                    near: {
                                        type: 'Point',
                                        coordinates:[longitude,latitude]
                                    },
                                    distanceField: 'distance'
                                }).sort('distance')
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
module.exports = router;