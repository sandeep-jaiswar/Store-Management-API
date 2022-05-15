var express = require("express");
var router = express.Router();
const userRoute = require("./user");
const authRoute = require("./auth");
const otpRoute = require("./otp");

router.get("/", (req, res, next) => {
    res.send("root route")
});

router.use("/user", userRoute);
router.use("/auth", authRoute);
router.use("/otp", otpRoute);

module.exports = router;
