const Order= require('../models/order')
const OrderItems= require('../models/order-items')
const mongoose=require('mongoose')
const Product = require('../models/product')

exports.index = async (req, res, next) => {
    try {
       const myOrders = await Order.find()
        res.json({
        success: true,
        orders: myOrders
       })
    } catch (error) {
        res.status(500).json({ success: false });
    }
}
exports.patch=async(req,res)=>{
    let {shippingAddress,invoiceAddress,city,country,phone,status}=req.body 
    let {id}=req.params
    const myOrder = {shippingAddress,invoiceAddress,city,country,phone,status}

    thisOrder=await Order.findByIdAndUpdate({'_id':id},myOrder)
    return res.json({
        success:true,
        thisOrder
    })

}
exports.store=async(req,res)=>{
    let {shippingAddress,invoiceAddress,city,country,phone,status,orderItems}=req.body 
    let user = '64490a5e7cb4b9d2b985cb3f'
    let total=0
    const orderItemsIds = await Promise.all(orderItems.map(async item => {
        const {price} = await Product.findById(item.product, 'price')
        
        const newItem = {
            ...orderItems,
            price
        }
        total += (item.quantity * price)
       const myOrderItem = await OrderItems.create(newItem)
       return myOrderItem._id
    }))
    const myOrder = new Order({shippingAddress,invoiceAddress,city,country,phone,status,orderItems: orderItemsIds,user,total})
    myOrder.save()
             .then(insertedOrder => {
                res.status(201).json({
                    order: insertedOrder,
                    success: true
                })
             })
             .catch(err => {
                res.status(500).json({
                    error: err,
                    success: false
                })
             })
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
        const order = await Order.findOneAndRemove({'_id':id});
        return res.json({categorie})
       
    } catch (error) { 
        res.status(500).json('false',{success:false})
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
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success:true,
                message:"makaynch had l3bar"
            })
        }
        return res.json({
            success:true    ,        
            order
        });
      
    } catch (error) {
        res.status(500).json({success:false},error)
    }
    
}