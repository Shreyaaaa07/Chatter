import express from 'express';
import { loginUser, verifyUser } from '../controllers/user.js';
import { isAuth } from '../middleware/isauth.js';
import { myProfile } from '../controllers/user.js';
const router = express.Router();

router.post("/login", loginUser)
router.post("/verify", verifyUser)
router.get("/me", isAuth, myProfile);
export default router;

