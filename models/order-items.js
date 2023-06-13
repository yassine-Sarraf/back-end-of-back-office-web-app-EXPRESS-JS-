const {Schema,model}=require('mongoose')

const schemaOrderItem=new Schema({
    product:{
        type:Schema.Types.ObjectId,'ref':'product'
    },
    quantity:{
        type:Number,
        // required:true
    },                               
    price:Number
})
module.exports=model('order-item',schemaOrderItem)