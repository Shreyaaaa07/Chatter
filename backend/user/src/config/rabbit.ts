import dotenv from 'dotenv';
import amqp from 'amqplib';
import {onnectRabbitMQ} from './rabbit';


dotenv.config();

let channel: amqp.Channel | null = null;
let connection: amqp.Connection | null = null;
let connectionPromise: Promise<void> | null = null;


    export const connectRabbitMQ = async () => {
    try {
        // TEMP DEBUG LOG: Check if process.env reads anything at all
        console.log("DEBUG ENV STATUS:", {
            host: process.env.Rabbitmq_Host || process.env.RABBITMQ_HOST || "MISSING",
            user: process.env.Rabbitmq_Username || process.env.RABBITMQ_USERNAME || "MISSING",
        });

        const host = process.env.Rabbitmq_Host || process.env.RABBITMQ_HOST;
        const username = process.env.Rabbitmq_Username || process.env.RABBITMQ_USERNAME;
        const password = process.env.Rabbitmq_Password || process.env.RABBITMQ_PASSWORD;

        // Force a raw connection URL string instead of passing an options object.
        // This is often more resilient with standard amqplib clients.
        const connectionUrl = `amqp://${username}:${password}@${host}:5672`;
        console.log(`Connecting to URL string...`);

        const connection = await amqp.connect(connectionUrl);
        const channel = await connection.createChannel();
        console.log("✅ Successfully reached and created RabbitMQ channel!");
        
    } catch (error) {
        console.error("❌ RAW ERRORED CONNECTION:", error);
    }
};


    return connectionPromise;
};

export const publishToQueue = async (queueName: string, message: any): Promise<void> =>{
    // 2. FIX: If connection hasn't started or is still processing, wait for it instead of failing
    if (!channel) {
        console.log("⏳ Channel not ready. Waiting for connection...");
        try {
            await connectRabbitMQ();
        } catch (err) {
            console.error("❌ Cannot publish; connection initialization failed.");
            return;
        }
    }

    if (!channel) return;

    try {
        // 3. FIX: Await the queue assertion to ensure it exists before sending
        await channel.assertQueue(queueName, { durable: true });
        
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true,
        });
        console.log(`✉️ Message sent to queue: ${queueName}`);
    } catch (error) {
        console.error(`❌ Failed to publish to queue ${queueName}:`, error);
    }
};
