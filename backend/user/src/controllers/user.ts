import TryCatch from "../config/TryCatch.js";
import { redisClient } from "../index.js";

export const LoginUser = TryCatch(async (req, res) => {
    const { email } = req.body;
    const rateLimitKey = `email:${email}`;
    
    const rateLimit = await redisClient.get(rateLimitKey);
    
    if (rateLimit) {
        return res.status(429).json({
            message: "Too many requests. Please wait before requesting new OTP.",
            error: "Too many requests"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // Your next logic goes here (e.g., saving OTP to redis or sending email)

});
