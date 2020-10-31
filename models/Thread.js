const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: {
            type: String,
            default: "text"
        },
        body: {
            type: String
        },
        time: {
            type: Date,
            default: Date.now
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
}, { timestamps: true });

module.exports = Thread = mongoose.model('Thread', threadSchema);