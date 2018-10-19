const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    login: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    liveIn: {
        type: String
    },

    joinDate: {
        type: Date,
        required: true
    },

    attendedTo: {
        type: String
    },

    number: {
        type: String
    },

    email: {
        type: String,
        required: true
    },

    work: {
        type: String
    }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema); 