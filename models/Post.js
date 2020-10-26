const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    DateTime: {
        type: String,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String
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
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }
})

postSchema.index({ location: "2dsphere" })
module.exports = mongoose.model('Post', postSchema);