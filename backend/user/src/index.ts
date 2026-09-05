import express from "express";
import dotenv from "dotenv";
export const connectDb = () => {
  // Your database connection logic here
};
import {createClient} from 'redis'


dotenv.config();
connectDb();

export const redisClient = createClient({
    url: process.env.REDIS_URL,
)};  

redisClient.on('error', (err) => console.error("Redis client error:", err));



const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
