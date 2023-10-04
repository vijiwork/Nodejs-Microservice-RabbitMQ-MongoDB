const express = require('express');
const router = express.Router();

router.use('/product',require('./product-api'));

module.exports=router;