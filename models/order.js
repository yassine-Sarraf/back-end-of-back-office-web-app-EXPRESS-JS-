const {Schema,model}=require('mongoose')

const schemaOrder=new Schema({
    shippingAddress:{
        type: String,
        required: true
    },
    invoiceAddress:String,             
    city:String,
    country: String,
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['shipped','received','canceled','pending']
    },
    total:Number,
    orderItems:[{
        type:Schema.Types.ObjectId,ref : 'order-item'
    }],
    user:{
        type:Schema.Types.ObjectId,'ref':'user',
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports=model('order',schemaOrder)