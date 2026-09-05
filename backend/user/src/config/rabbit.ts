import amqplib from 'amqplib'

let channel: amqplib.Channel;

export const  connectRabbitMQ = async() => {
    try{
        const connection =await amqp.connect({
          protocol: "amqp",
          hostname: process.env.Rabbitmq_Host,
          port: 5672,
          username: process.env.RabbitMQ,
          password: process.env.RabbitMQ_Password,  
        });
        channel = await connection.createChannel();
        console.log("Connected to RabbitMQ");

    } catch (error) {
        console.error('Failed to connect:', error);
        process.exit(1);
    }
}