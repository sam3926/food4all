const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    donorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title:{
        type: String,
        required:true
    },
    expiryTime: {
        type: Schema.Types.Date,
        default: Date.now()
    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        required: true
    },
    location: {
        type: { type: String },
        coordinates: [Number]
    }
},{
    timestamps:true
});

eventSchema.index({ location: "2dsphere" })

module.exports = mongoose.model('Event', eventSchema);