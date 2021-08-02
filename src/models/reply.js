const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const replySchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;