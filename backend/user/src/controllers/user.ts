import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";
import { publishToQueue } from "../config/rabbitmq.js";

export const GenerateOTP = TryCatch(async (req, res) => {
    const { email } = req.body;
    const rateLimitKey = `email:${email}`;
    
    // Check if the user is rate-limited
    const rateLimit = await redisClient.get(rateLimitKey);
    if (rateLimit) {
        return res.status(429).json({
            message: "Too many requests. Please wait before requesting new OTP.",
            error: "Too many requests"
        });
    }

    // 1. Generate a random 6-digit OTP number
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // 2. Define the key and save the OTP to Redis (expires in 5 minutes)
    const otpKey = `otp:${email}`;

    await redisClient.set(otpKey, otp.toString(), {
        EX: 300
    });

    // 3. Set your rate limit tracking key (expires in 1 minute / 60 seconds)
    await redisClient.set(rateLimitKey, "true", {
        EX: 60
    });

    // 4. Construct the email notification payload
    const message = {
        to: email,
        subject: "Your OTP Code",
        body: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };

    // 5. Send payload to your RabbitMQ background worker queue
    await publishToQueue("send-otp", message);

    // 6. Return response to user successfully
    return res.status(200).json({
        message: "OTP sent successfully.",
        otp: otp
    });
});
