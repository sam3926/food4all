const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DonationSchema = new Schema({
    donorId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    RecieverId:{
        type:Schema.Types.ObjectId
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type: String,
        required:true
    },
    postTime:{
        type: Date,
        default:Date.now
    },
    acceptedTime:{
        type:Date,

    },
    imageurl:[]
})

module.exports = Donations = mongoose.model("donations",DonationSchema);
