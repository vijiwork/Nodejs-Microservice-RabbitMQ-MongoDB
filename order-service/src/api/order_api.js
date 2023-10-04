const OrderModel = require("../../model/order-model");

module.exports = async function createOrder(itms) {
  let amtdata = await calculateGrandTotal(itms);
  const newOrder = new OrderModel({
    grand_total: amtdata.grand_total,
    delivery_charge: amtdata.delivery_charge,
    gst: amtdata.gst,
    order_total: amtdata.order_total,
    gst_amt: amtdata.gst_amt,
    products_buy: itms,
  });
  let resp = await newOrder.save();
  if (resp) {
    console.log("Order created successfully");
  } else {
    console.log("error");
  }
  return resp;
};

const calculateGrandTotal = (products) => {
  if (products) {
    let total = 0;
    for (let x of products) {
      total += x.product_price * 1;
    }

    let deliverycharge = 50;
    let gst = 5;
    let ingst = (total * gst) / 100;
    let grandtotal = total + ingst + deliverycharge;
    let totobj = {
      grand_total: grandtotal,
      delivery_charge: deliverycharge,
      gst: gst,
      order_total: total,
      gst_amt: ingst,
    };
    return totobj;
  }
};
