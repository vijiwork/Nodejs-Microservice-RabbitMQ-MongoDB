const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema=new Schema({
    product_name:String,
    product_price:Number,
    product_description:String,
    product_category:String,
    product_brand:String,
});

const ProductModel=mongoose.model('products', productSchema);

module.exports=ProductModel;