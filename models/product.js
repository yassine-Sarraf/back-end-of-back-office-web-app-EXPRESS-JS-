// const{Schema,model}=require('mongoose')
// this is how our prof declare it
const mongoose= require('mongoose')
// const schemaProduct= Schema .......
const schemaProduct=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:4
    },
    description:String,
    content:String,
    brand:String,
    countStock:{
        type:Number,
        default:0
    },
    price: Number,
    thumbnail:String,
    images:[String],
    rating:{
        type:Number,
        enum:[0,1,2,3,4,5],
        default:0
    },
    isFeatred:{
        type: Boolean,
        default:false
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,ref: 'Categorie'
    }
})

module.exports = mongoose.model('Product',schemaProduct)