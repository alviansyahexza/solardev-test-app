const express = require('express')
const { User } = require('../repo/model/User')
const router = express.Router()
var jwt = require('jsonwebtoken');

router.get('/ping', function (req, res, next) {
    console.log("pong");
})

router.get('/me', (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '')
    const user = jwt.verify(token, 'asawau')
    res.send(user)
})

router.post("/sign-in", async function (req, res, next) {
    const body = req.body;
    const user = await User.findOne({ email: body.email, password: body.password });
    if (!user) {
        res.status(404).send({
            message: "invalid email or password",
            resorce: "user"
        })
    }
    else {
        console.log(user);
        var token = jwt.sign(user.toJSON(), 'asawau', { expiresIn: '30m' });
        res.send(token)
    }
});

router.post("/sign-up", function (req, res, next) {
    const body = req.body;
    const user = new User({
        email: body.email,
        password: body.password
    })
    user.save();
    res.send(user);
});

module.exports = router;