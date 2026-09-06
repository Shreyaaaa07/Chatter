import express from 'express';
import { loginUser } from '../controllers/user.ts';
const router = express.Router();
router.post("/login", loginUser);
export default router;
//# sourceMappingURL=user.js.map