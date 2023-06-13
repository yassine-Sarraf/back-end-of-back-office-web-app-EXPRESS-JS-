const Categorie =require('../models/categorie')
const mongoose =require('mongoose')

exports.index= async(req, res, next)=> {
    try {
        const categorie = await Categorie.find()
        return res.json({
        categorie,
        success:true            
        });
      } catch (error) {
        res.status(500).json({success:false,
        message:error})
      }
}
exports.remove=async(req,res)=>{
    let { id }=req.params
    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            succes:false,
            message:'id is not valid'
        })
    }
    try {
        const categorie = await Categorie.findOneAndRemove({'_id':id});
        return res.json({categorie})
       
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
        const categorie = await Categorie.findOneAndUpdate({'_id':id},req.body);
        if (!categorie) {
            return res.status(404).json({
                success:false,
                message:"makaynch had l3bar"
            })
        }
        return res.json({
        categorie,
        success:true            
        });
      
    } catch (error) {
        res.status(500).json('false',{success:false})
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
        const categorie = await Categorie.findOneAndReplace({'_id':id},req.body);
        if (!categorie) {
            return res.status(404).json({
                success:true,
                message:"makaynch had l3bar"
            })
        }
        return res.json({
        categorie,
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
        const categorie = await Categorie.findById(id);
        if (!categorie) {
            return res.status(404).json({
                success:true,
                message:"makaynch had l3bar"
            })
        }
        return res.json({
        categorie,
        success:true            
        });
      
    } catch (error) {
        res.status(500).json({success:false})
    }
    
}
exports.store=(req,res)=>{
    let {label,icon,color}=req.body 
    const myCategorie =new Categorie({
        label,
        icon,
        color,
    })
    myCategorie.save()
        .then(insertedCategorie=>{
            res.status(201).json({
                categorie:insertedCategorie,
                success:true
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err,
                success:false
            })
        })

}                                                                 