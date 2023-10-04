const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema=new Schema({
    products_buy:Array,
    order_total:Number,
    gst:Number,
    gst_amt:Number,
    delivery_charge:Number,
    grand_total:Number,
    user:String,
});

const OrderModel=mongoose.model('orders', orderSchema);

module.exports=OrderModel;