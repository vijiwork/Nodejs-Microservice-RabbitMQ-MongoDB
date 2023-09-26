const express=require('express');
const router=express.Router();

router.use('/product',require('./product-model'));

module.exports=router;