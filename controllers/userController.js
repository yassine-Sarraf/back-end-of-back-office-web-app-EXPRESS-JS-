const User=require('../models/user')
const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
// const {expressjwt:jwt}=require('express-jwt')

exports.index= async(req, res)=> {
    
    try {
        const user = await User.find()
         return res.json({
          user,
          success:true            
          });
      
    } catch (error) {
      res.status(500).json({success:false,
      message:error})
    }

}
exports.register=async(req,res)=>{
    let { name,email,password,address,city,country,phone}= req.body
    const myUser =new User({
        name,
        email,
        password: bcrypt.hashSync(password,10) ,//you forgot the hash method here
        address,
        city,
        country,
        phone,
    })
    try{
        const result= await myUser.save()
        res.status(201).json({
            success:true,
            result
        })
    }catch(error){
        res.status(404).json({
            success:false,
            message:"can't save user"
        })
    }
}
exports.login= async(req,res)=>{
    const{email,password}=req.body
    const user = await User.findOne({'email':email})
    
    // return res.json(user)
   try {

     if (!user) {
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
     }
     if (user && bcrypt.compareSync(password, user.password)) {
        //   return res.json({
        //     success:true
        //     ,user
        // })

        const secret="e0a6fe63-ae0d-4f49-9eb6-37fbbbbf89e8"
        
        const token= jwt.sign({userId:user._id,name:user.name,email:user.email},secret,{expiresIn:'5000'})
        return res.status(200).json({
            success:true,
            message:'user is authentification',
            name:user.name,
            email:user.email,
            token
        })
    }

} catch (error) 
    {
    res.status(500).json({success:false,message:"user not found"})
   }
}
exports.remove=async(req,res)=>{
    let {id}=req.params
    try {
        let UserToRemove=await User.findOneAndRemove({'_id':id})
        return res.json({
            success:true,
            deleted_user:UserToRemove
        });
    } catch (error) {
        return res.json({
            success:false,
            error
        })
    }
}
exports.getOne=async(req,res)=>{
    let {id}=req.params;
    try {
        const user=await User.findById({'_id':id})
        return res.json({
            success:true,
            user
        })
    } catch (error) {
        return res.json({
            success:false,
            error
        })
    }
}
exports.patch=async(req,res)=>{
    let {id}=req.params
   
    try {   
            let userToPatch=await User.findByIdAndUpdate({'_id':id},req.body)
            return res.json({
                success:true,
                userToPatch
            })

    } catch (error) {
        return res.json({
            success:false,
            error
        })
    }
}