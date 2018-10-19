const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        isRequired: true
    },

    email: {
        type: String,
        isRequired: true
    },

    password: {
        type: String,
        isRequired: true
    },

    avatar: {
        type: String,
        default: 'https://iupac.org/cms/wp-content/uploads/2018/05/default-avatar.png'
    },

    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = User = mongoose.model('users', userSchema);