import {} from "express";
import { IUser } from "../model/user.js";
import jwt, { JwtPayload } from "jsonwebtoken";
export const isAuth = Aync(req, AuthenticatedRequest, res, Response, next, NextFunction), promise;
;
{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Please Login - No auth Header, or invalid auth header" });
        }
        const token = authHeader.split(" ")[1];
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedvalue || !dsecodedValue.userId)
            ;
    }
    catch (error) { }
}
//# sourceMappingURL=isauth.js.map