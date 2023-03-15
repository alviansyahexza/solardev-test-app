const express = require('express')
const { User } = require('../repo/model/User')
const router = express.Router()

router.get('/ping', function (req, res, next) {
    console.log("pong");
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
    else res.send(user)
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