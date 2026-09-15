import { User } from "../modal/User.js";
import jwt, {} from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Please Login - No auth header" });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Please Login - No token" });
            return;
        }
        const decodedValue = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedValue || !decodedValue.userId) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        const user = await User.findById(decodedValue.userId);
        if (!user) {
            res.status(401).json({ message: "Please Login - User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Please Login - JWT error" });
    }
};
//# sourceMappingURL=isAuth.js.map