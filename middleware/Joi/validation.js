const Joi =require('joi')

exports.validateCategorie=(req,res,next)=>{
    const schema=Joi.object({
        label:Joi.string().max(30),
        icon:Joi.string().required(),
        color:Joi.string().max(15).required(),
        
    })
    const {value,error} =schema.validate(req.body)
    if (error) {
        const {path,message}=error.details[0];
        return res.json({
            error:{ 
                path:path[0],
                message
            }  
        })
    }
    next()
}
exports.validateProduct=(req,res,next)=>{
    const schema=Joi.object({
        title:Joi.string().max(30).required(),
        description:Joi.string().min(10).max(50).required(),
        content:Joi.string().min(10).max(100).required(),
        brand:Joi.string().max(50).required(),
        countStock:Joi.number().required(),
        price:Joi.number().required() ,
       // thumbnail:Joi.string().required(),
        image:Joi.string(),
        rating:Joi.number().required(),
        isFeatred:Joi.boolean(),
      //  created_at:Joi.date(),
     //   updated_at:Joi.date(),
        categorie:Joi.string().min(10).required()
    })
    const {error}=schema.validate(req.body)
    if (error) {
        const {path,message}=error.details[0];
        return res.json({
            error:{ 
                path:path[0],
                message
            }  
        })
    }
    next()
}