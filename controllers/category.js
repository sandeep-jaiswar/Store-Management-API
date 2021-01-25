const { errorHandler } = require('../helpers/dbErrorHandler');
const category = require('../models/category')

exports.create= (req,res)=>{
    const Category = new category(req.body);
    Category.save((err,data)=>{
        if(err || !data){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({data});
    })
}

exports.categoryById= (req,res,next,id)=>{
    category.findById(id).exec((err,category)=>{
        if(err || !category){
            return res.status(400).json({
                error : "category not Found"
            })
        }
        req.category =category;
        next();
    })
}

exports.read = (req,res)=>{
   return res.json(req.category);
}

exports.getAll = (req,res) =>{
    category.find((err,data)=>{
        if(err || !data){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({data});
    })
}

exports.update = (req,res)=>{
    var category = req.category;
    category.name= req.body.name;
    category.save((err,data)=>{
        if(err || !data){
            return res.status(400).json({
                err : errorHandler(err)
            })
        }
        res.json({data});
    })
}

exports.remove = (req,res)=>{
    var category = req.category;
    category.remove((err,data)=>{
        console.log(err)
        if(err || !data){
            return res.status(400).json({
                error : errorHandler(err)
            })
        }
        res.json({data,
        "message": "Category deleted successfully"})

    })
 }