const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    author:{
        type:String,
        required:true
    },
    DateTime: {
        type: String,
        default: Date.now(),
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: [{
        type: String
    }],
    noOfLikes: {
        type: Number,
        default: 0
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    liked: {
        type: Boolean,
        default:false
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }
})

postSchema.index({ location: "2dsphere" })
module.exports = mongoose.model('Post', postSchema);