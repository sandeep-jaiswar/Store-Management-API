const axios = require("axios")
const querystring = require("querystring")
const { OTPManager } = require("../helpers/OTPManager")
const { create } = require("./user")

exports.sendOTP = async (req, res, next) => {
  const { mobile } = req.body
  const otp = randomGenOTP()
  try {
    axios({
      method: "POST",
      url: "https://www.fast2sms.com/dev/bulkV2",
      headers: {
        Authorization: process.env.SMSAUTH,
      },
      data: querystring.stringify({
        message: `This is a test OTP : ${otp}`,
        language: "english",
        route: "q",
        numbers: mobile,
      }),
    }).then((response) => {
      if (
        response.data &&
        response.data.return &&
        response.data.request_id &&
        response.data.message == "SMS sent successfully."
      ) {
        req.body.mobile = mobile
        req.body.otp = otp
        create(req, res, () => {
          res.send({
            success: true,
            message: response.data.message,
          })
        })
      } else {
        res.send({
          success: false,
          message: `${response.data.message}`,
        })
      }
    })
  } catch (e) {
    res.send({
      success: false,
      message: `${e.message}`,
    })
  }
}

exports.verifyOTP = async (req, res, next) => {
  try {
    const { mobile, otp } = req.body
    await global.db
      .collection("users")
      .findOne({ mobile, otp }, (err, user) => {
        if (err) {
          res.send({
            success: false,
            message: err,
          })
        } else if (!user) {
          res.send({
            success: false,
            message: "OTP is invalid",
          })
        } else {
          req.session.sid = user._id;
          res.send(user);
        }
      })
  } catch (e) {
    res.send({
      success: false,
      message: e.message,
    })
  }
}

const randomGenOTP = () => {
  return Math.floor(1000 + Math.random() * 9000)
}
