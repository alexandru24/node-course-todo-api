const mongoose = require('mongoose')

const Users = mongoose.model('users', {
    name: {
        required: true,
        trim: true,
        minLength: 1,
        type: String
    },
    age: {
        required: true,
        type: Number,
    },
    location: {
        required: true,
        trim: true,
        minLength: 1,
        type: String
    }
})

module.exports = {Users}