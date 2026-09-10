import { type Request } from "express";
import { IUser } from "../model/user.js";
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const isAuth: any, promise: any;
//# sourceMappingURL=isauth.d.ts.map