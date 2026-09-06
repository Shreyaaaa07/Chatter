import TryCatch  from "../config/TryCatch.js";

 export const LoginUser = TryCatch(async(req,res)=>{
    const {email}=req.body

    const rateLimitKey = `otp:ratelimet;${email}`;
 } )