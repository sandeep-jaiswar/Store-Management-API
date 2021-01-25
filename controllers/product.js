const fs= require('fs')
const formidable = require('formidable');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const product = require('../models/product')

exports.create= (req,res)=>{
    let form= new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        console.log(files);
        if(err){
            return res.status(400).json({
                err : "Image could not be uploaded"
            })
        }
        const Product = new product(fields);
        const {name,description,price,category,quantity} = fields;

        if(!name||!description||!price||!category||!quantity){
            return res.status(400).json({
                err : "All fields are required"
            })
        }
        if(files.photo){
            if(files.photo.size > 5000000){
                return res.status(400).json({
                    err : "Image should not be greater than 5MB"
                })
            }
            Product.photo.data =fs.readFileSync(files.photo.path);
            Product.photo.contentType=files.photo.type;
        }
        Product.save((err,data)=>{
            if(err || !data){
                return res.status(400).json({
                    err : errorHandler(err)
                })
            }
            res.json({data});
        })
    })
}

exports.productById = (req,res,next,id)=>{
    product.findById(id).exec((err,product)=>{
        console.log(err)
        if(err || !product){
            return res.status(400).json({
                error : "product not Found"
            })
        }
        req.product =product;
        next();
    })
}

exports.read = (req,res)=>{
    
    req.product.photo =undefined;
    return res.json(req.product)
} 

exports.remove=(req,res)=>{
    console.log("remove")
    let product = req.product;
    product.remove((err,data)=>{
        console.log(err)
        if(err || !data){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({data,
        "message": "Product deleted successfully"})

    })
}

exports.update= (req,res)=>{
    let form= new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,files)=>{
        console.log(files);
        if(err){
            return res.status(400).json({
                err : "Image could not be uploaded"
            })
        }
        var Product = req.product;
        Product = _.extend(Product,fields)
        const {name,description,price,category,quantity} = fields;
        console.log(name);
        console.log(description);
        console.log(quantity);
        console.log(category);
        console.log(price);
        if(!name||!description||!price||!category||!quantity){
            return res.status(400).json({
                err : "All fields are required"
            })
        }
        if(files.photo){
            if(files.photo.size > 5000000){
                return res.status(400).json({
                    err : "Image should not be greater than 5MB"
                })
            }
            Product.photo.data =fs.readFileSync(files.photo.path);
            Product.photo.contentType=files.photo.type;
        }
        Product.save((err,data)=>{
            if(err || !data){
                return res.status(400).json({
                    err : errorHandler(err)
                })
            }
            res.json({data});
        })
    })
}





/// for highest sell product and new arrived products

exports.getAll = (req,res) =>{
    var order = req.query.order ? req.query.order :'asc';
    console.log("order : "+order)
    var sortBy = req.query.sortBy ? req.query.sortBy :'_id';
    console.log("sortBy : "+sortBy)
    var limit = req.query.limit ? req.query.limit :2;
    console.log("limit : "+limit)
    product.find().select("-photo").populate('category').sort([[sortBy,order]]).limit(parseInt(limit)).exec((err,data)=>{
        console.log(err)
        if(err || !data){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json(data);
    })
}

exports.relatedProducts = (req,res)=>{
    var limit = req.query.limit ? req.query.limit :2;
    product.find({_id:{$ne: req.product},category: req.product.category}).limit(parseInt(limit))
    .populate('category', '_id name').exec((err,data)=>{
        console.log(err)
        if(err || !data){
            return res.status(400).json({
                err : "Products not found"
            })
        }
        res.json(data);
    })

}

exports.listCategories =(req,res)=>{
    console.log("gotch")
    product.distinct("category",{},(err,data)=>{

        if(err || !data){
            return res.status(400).json({
                err : "categories not found"
            })
        }
        res.json(data);
    })
}

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) =>{
    if(req.product.photo.data){
        res.set('Content-Type',req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}