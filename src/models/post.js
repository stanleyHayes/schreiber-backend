const mongoose = require('mongoose');
const slugify = require('slugify');
const readingTime = require('reading-time');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true
    },
    content: {
        type: [String],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stats: {
        words: {
            type: Number
        },
        minutes: {
            type: Number
        },
        text: {
            type: String
        }
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'Category'
    },
    tags: {
        type: [String]
    },
    published: {
        isPublished: {
            type: Boolean,
            default: false
        },
        publishedAt: {
            type: Date
        }
    },
    references: {
        type: [String]
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

postSchema.pre('save', function (next) {
    this.slug = slugify(this.title, {replacement: '-', lower: true, trim: true});
    this.stats = {...readingTime(this.content.join(" "))};
    next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;