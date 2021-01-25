var express = require('express');
var router = express.Router();
const {requireSignin, isAdmin, isAuth} = require('../controllers/auth');
const {userById,read,update} = require('../controllers/user');

router.param('userId',userById);
router.get('/user/:userId',requireSignin,isAuth,read);
router.put('/user/:userId',requireSignin,isAuth,update);

router.get('/secret/:userId',requireSignin,isAuth,isAdmin,(req,res)=>{
    res.json({
        user: req.profile
    })
})
module.exports = router;
