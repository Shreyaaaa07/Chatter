import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import { createClient } from 'redis'    

dotenv.config()

connectDb()

const redisUrl = process.env.REDIS_URL
if (!redisUrl) {
  throw new Error('REDIS_URL is not defined in .env')
}
export const redisClient = createClient({
  url: redisUrl,
})

redisClient.connect().then(()=>console.log("Connected to Redis")) .catch(console.error)

const app = express()


const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})