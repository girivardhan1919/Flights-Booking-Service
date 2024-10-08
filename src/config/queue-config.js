const amqplib = require("amqplib");
const { NOTIFY_QUEUE } = require('./server-config');

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue(NOTIFY_QUEUE);
  } catch (error) {
    console.log(error);
  }
}

async function sendData(data) {
  try {
    await channel.sendToQueue(NOTIFY_QUEUE, Buffer.from(JSON.stringify(data)))
  } catch (error) {
    console.log("queue error", error);
  }
}

module.exports = {
  connectQueue,
  sendData
}