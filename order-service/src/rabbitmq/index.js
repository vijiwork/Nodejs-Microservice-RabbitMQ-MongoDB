const amqplib = require("amqplib");
const orderapi = require("../api/order_api");
const dotenv=require("dotenv");
dotenv.config();

const connect = async () => {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqplib.connect(amqpServer);
    const channel = await connection.createChannel();
   // let exch = process.env.EXCHANGE_KEY;
   // let rkey = process.env.QUEUE_KEY; // to identify which queue the data is sent to
    await channel.assertExchange(process.env.EXCHANGE_KEY, process.env.EXCHANGE_TYPE, { durable: true }).catch(console.error); // middileman of producer and queue
    await channel.assertQueue(process.env.QUEUE_NAME, { durable: true }); //create queue
    console.log("Order service connected to RABBITMQ");
    await channel.bindQueue(process.env.QUEUE_NAME, process.env.EXCHANGE_KEY, process.env.QUEUE_KEY); //bind exchange to queue
    channel.consume(process.env.QUEUE_NAME, async function (msg) { //receive message from producer(product-service)
      let jprs = JSON.parse(msg.content);
      if (msg.content) {
        channel.ack(msg);
        let data = await orderapi(jprs); //save order to database
        if (data) {
          let itms = JSON.stringify(data);
          await channel.assertQueue(process.env.OQUEUE_NAME, { durable: true }); //create queue to inform order is created
          channel.sendToQueue(process.env.OQUEUE_NAME, Buffer.from(JSON.stringify(itms))); //send message to consumer(product-service)
                }
      }

      // }, {
      //   noAck: false
    });

    // setTimeout( function()  {
    //   channel.close();
    //   connection.close();},  500 );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect();
