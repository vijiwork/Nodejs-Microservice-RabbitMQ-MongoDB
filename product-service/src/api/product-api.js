const express = require("express");
const ProductModel = require("../../model");
const router = express.Router();
const rbt = require("../rabbitmq");

router.post("/create", async (req, res) => {
  const {
    product_name,
    product_price,
    product_description,
    product_category,
    product_brand,
  } = req.body;

  const newProduct = new ProductModel({
    product_name,
    product_price,
    product_description,
    product_category,
    product_brand,
  });
  await newProduct
    .save()
    .then((data) => console.log("Product created", data))
    .catch((err) => console.log(err));
});

router.get("/buy", async (req, res) => {
  //ids:[
  // "651a6f1f5bc8a6146a8e7be4","651a6e376255de939c56a8ee"
  //   ]

  const { ids } = req.body;
  console.log(ids);
  await ProductModel.find()
    .where("_id")
    .in(ids)
    .exec()
    .then(async (data) => {
      let jstr = JSON.stringify(data);

      await rbt(jstr);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
