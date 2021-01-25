var express = require('express');
var router = express.Router();
const { signup, signin, signout ,requireSignin} = require('../controllers/auth');
const { userSignupValidator } = require('../validators/userSignupValidator');

/* GET users listing. */
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout',requireSignin, signout);

module.exports = router;
