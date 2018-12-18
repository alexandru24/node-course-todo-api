const mongoose = require('mongoose')

const UserEmail = mongoose.model('users', {
    email: {
        required: true,
        trim: true,
        minLength: 1,
        type: String
    }
})

module.exports = {UserEmail}