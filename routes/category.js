var express = require('express');
var router = express.Router();
const {create,categoryById,read,update,remove,getAll} = require('../controllers/category');
const { requireSignin, isAdmin} = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.param('userId',userById);
router.param('categoryId',categoryById);
router.get('/category/:categoryId',read);
router.get('/categories',getAll);
router.post('/category/create/:userId',requireSignin,isAdmin,create);
router.put('/category/:categoryId/:userId',requireSignin,isAdmin,update);
router.delete('/category/:categoryId/:userId',requireSignin,isAdmin,remove);



module.exports = router;
