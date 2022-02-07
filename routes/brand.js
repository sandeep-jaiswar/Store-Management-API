var express = require("express");
var router = express.Router();
const {
  create,
} = require("../controllers/brand");

router.post("/brand", create);

module.exports = router;
