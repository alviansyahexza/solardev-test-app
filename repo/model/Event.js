const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    start: {
        type: Number,
        reqired: true
    },
    end: {
        type: Number,
        reqired: true
    }
})

const Event = mongoose.model('Event', EventSchema)

module.exports = { Event }