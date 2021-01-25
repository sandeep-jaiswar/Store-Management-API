var express = require('express');
var router = express.Router();
const {create,read,productById,remove,update,getAll,relatedProducts,listCategories,listBySearch,photo} = require('../controllers/product');
const { requireSignin,isAuth, isAdmin} = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.get('/product/:productId',read);
router.get('/product/related/:productId',relatedProducts)
router.get('/product/photo/:productId',photo)
router.get('/products/categories',listCategories);
router.post("/products/by/search", listBySearch);
router.get('/products',getAll);
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove);
router.post('/product/update/:productId/:userId',requireSignin,isAdmin,update)

router.param('userId',userById);
router.param('productId',productById);


module.exports = router;
