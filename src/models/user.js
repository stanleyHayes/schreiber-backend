const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`Invalid email ${value}`);
            }
        }
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    profile: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        minlength: [6, 'Password should have a min length of 6'],
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(`Weak password ${value}`);
            }
        }
    },
    image: {
        type: String
    },
    cover: {
        type: String
    },
    devices: {
        type: [{
            ip: {type: String},
            browser: {type: String},
            isMobile: {type: Boolean},
            isDesktop: {type: Boolean},
            os: {type: String},
            platform: {type: String},
            source: {type: String},
            token: {type: String}
        }]
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SUPER ADMIN', 'EDITOR', 'SUBSCRIBER'],
        default: 'SUBSCRIBER'
    },
    verification: {
        otp: {
            type: String,
        },
        otpValidUntil: {
            type: Date
        },
        otpVerifiedAt: {
            type: Date
        },
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    status: {
        type: String
    },
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'Category'
    },
    following: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    followers: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;