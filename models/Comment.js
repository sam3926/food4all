const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comments:[{
        author:{
            type:String,
            required:true
        },
        avatar:{
            type: String,

        },
        content:{
            type:String,
            required:true
        },
        datetime:{
            type:String
        }
    }],
})

module.exports = mongoose.model('Comment', commentSchema);