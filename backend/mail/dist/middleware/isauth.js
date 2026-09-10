import {} from "express";
import { IUser } from "../model/user.js";
import jwt, { JwtPayload } from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Please Login - No auth Header, or invalid auth header" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedValue || !decodedValue.userId) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        // TODO: fetch user by decodedValue.userId and attach to req.user
        // req.user = await UserModel.findById(decodedValue.userId);
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=isauth.js.map