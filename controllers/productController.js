const product = require('../models/product');
const Product =require('../models/product')
const mongoose =require('mongoose')
const multer=require('multer')       

exports.index= async(req, res, next)=> {
    try {
          const product = await Product.find().populate('category','label');
           return res.json({
            product,
            success:true            
            });
        
      } catch (error) {
        res.status(500).json({success:false,error})
      }
}
exports.remove=async(req,res,next)=>{
    let { id }=req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            succes:false,
            message:'id is not valid'
        })
    }
    try {
        const product = await Product.findOneAndRemove({'_id':id});
       return res.json({product})
       
    } catch (error) { 
        res.status(500).json('false',{success:false})
    }
    
}
exports.patch=async(req,res,next)=>{
    let { id }=req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            succes:false,
            message:'id is not valid'
        })
    }
    try {
        const  thumbnail=`${process.env.DOMAINE_NAME}${process.env.PORT}/images/${req.file.filename}`           
        const productData= JSON.parse(req.body.product) 

        let product = await Product.findOneAndUpdate({'_id':id},{...productData,thumbnail},{new:true});
        if (!product) {
            return res.status(404).json({
                success:true,
                message:"makaynch had l3bar"
            })
        }
        return res.json({
            product,
            success:true            
        });
      
    } catch (error) {
        res.status(500).json({success:false,error})
    }
    
}
exports.update=async(req,res,next)=>{
    let { id }=req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            succes:false,
            message:'id is not valid'
        })
    }

    try {
        const product = await Product.findOneAndReplace({'_id':id},req.body);
        if (!product) {
            return res.status(404).json({
                success:true,
                message:"makaynch had l3bar"
            })
        }
        return res.json({
        product,
        success:true            
        });
      
    } catch (error) {
        res.status(500).json({success:false})
    }
    
}
exports.show=async(req,res,next)=>{
    let { id }=req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            succes:false,
            message:'id is not valid'
        })
    }
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success:true,
                message:"makaynch had l3bar"
            })
        }
        return res.json({
        product,
        success:true            
        });
      
    } catch (error) {
        res.status(500).json({success:false})
    }
    
}


exports.store=(req,res)=>{
    let images=[]

    //req.files.map(img => images.push(`${process.env.DOMAINE_NAME}${process.env.PORT}/images/${img.filename}`))   

    let  thumbnail=`${process.env.DOMAINE_NAME}${process.env.PORT}/images/${req.file.filename}`

    let {title,content,countStock,isFeatred,description,category,price}=JSON.parse(req.body.product)
    const myProduct =new Product({
        title,
        content,
        price,
        category,
        thumbnail,
        description,
       // images,
        countStock,
        isFeatred
    })
    myProduct.save()
        .then(insertedProduct=>{
            res.status(201).json({
                product:insertedProduct,
                success:true
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err,
                success:false
            })
        })
}
exports.search=async(req,res)=>{

    let segment =req.params.segment // working with segment
    let search =req.query.search
    let fields =req.query.fields

    if (search) {
        try {
            let result= await product.find({$or:
                [
                    {title:{$regex:search,'$options':'i'}},
                    {description:{$regex:search,'$options':'i'}},
                    {content:{$regex:search,'$options':'i'}}
                ]    
            }).select(fields)
            if(!result){
                res.status(404).json({
                    success:false,
                    message:"products not found!"
                })
            }
            res.json({
                products:result,
                success:true
            })
        } catch (error) {
            res.status(550).json({
                success:false
            })
        }
    }
}

exports.uploadImages=async(req,res)=>{
    let id= req.params.id
    const domaine=""// you forgot domain here
    const images=req.files.map(file=>`${domaine}/${file.filename}`)
    try{
        const updateProduct = await product.findByIdAndUpdate(id,{images:images},{new:true})
        if (!updateProduct) {
            return res.status(404).json({
                success:false,
                message:'product no found'
            })
        }
        res.json({
            success:true,
            product: updateProduct
        })
    }catch(error){
        res.json(error)
    }
}