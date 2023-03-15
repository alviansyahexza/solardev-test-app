const express = require('express');
const router = express.Router();
const { Event } = require('../repo/model/Event')
var jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    const body = req.body;
    const token = req.headers.authorization.replace('Bearer ', '')
    const user = jwt.verify(token, 'asawau')
    const start = body.start
    const end = body.end
    const date = new Date(start).setHours(0, 0, 0, 0)
    const event = new Event({
        name: body.name,
        userId: user._id,
        start: start,
        end: end,
        day: date
    })
    event.save();
    res.send(status(event));
})

router.get('/', async (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '')
    const user = jwt.verify(token, 'asawau')
    const events = await Event.find({ userId: user._id });
    res.send(events.map(status));
})

function status(event) {
    const date = Date.now();
    const status = (date < event.start) ? "Belum Dilaksanakan"
        : (date > event.end) ? "Telah Dilaksanakan"
            : "Sedang Dilaksanakan"
    return {
        status: status,
        start: event.start,
        end: event.end,
        name: event.name
    }
}

module.exports = router