const express = require('express')
const router = express.Router()

router.get('/ping', function (req, res, next) {
    console.log("pong");
})

router.post("/sign-in", function (req, res, next) {
    console.log(req.body);
});

router.post("/sign-up", function (req, res, next) {
    console.log(req.body);
});

module.exports = router;