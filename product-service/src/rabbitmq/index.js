const amqplib = require("amqplib");

module.exports = async function (msgs) {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqplib.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel
      .assertExchange(process.env.EXCHANGE_KEY, process.env.EXCHANGE_TYPE, {
        durable: true,
      })
      .catch(console.error);
    await channel.assertQueue(process.env.QUEUE_NAME, { durable: true });
    console.log("Product service connected to RABBITMQ");
    await channel.bindQueue(
      process.env.QUEUE_NAME,
      process.env.EXCHANGE_KEY,
      process.env.QUEUE_KEY
    );
    await channel.publish(
      process.env.EXCHANGE_KEY,
      process.env.QUEUE_KEY,
      Buffer.from(msgs)
    );
    //await channel.sendToQueue(process.env.QUEUE_NAME,Buffer.from(msgs) , {persistent: true});

    await channel.assertQueue(process.env.OQUEUE_NAME, { durable: true });
    channel.consume(process.env.OQUEUE_NAME, (data) => {
      console.log("Order placed successfully", JSON.parse(data.content));
      order = JSON.parse(data.content.toString());
      channel.ack(data);
    });

    // setTimeout( function()  {
    //   channel.close();
    //   connection.close();},  500 );
  } catch (error) {
    console.log(error);
  }
};
