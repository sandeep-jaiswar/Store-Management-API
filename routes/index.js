var express = require("express");
var router = express.Router();
const userRoute = require("./user")

router.get("/", (req, res, next) => {
    res.send("root route")
});

router.use("/user", userRoute);

module.exports = router;
