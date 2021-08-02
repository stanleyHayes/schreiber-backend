const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
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

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;