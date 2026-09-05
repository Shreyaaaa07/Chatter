import * as amqplib from 'amqplib'; // Changed to standard namespace import

let channel: amqplib.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect({ // Fixed typo: 'amqp.connect' -> 'amqplib.connect'
      protocol: "amqp",
      hostname: process.env.Rabbitmq_Host,
      port: 5672,
      username: process.env.RabbitMQ_Username,
      password: process.env.RabbitMQ_Password,
    });
    
    channel = await connection.createChannel();
    console.log("Connected to RabbitMQ");
    
  } catch (error) {
    console.error("Failed to connect:", error);
    process.exit(1);
  }
};
