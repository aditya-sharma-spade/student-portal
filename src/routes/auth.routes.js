import express from 'express';
import { registerUser,loginUser,changepassword, sendOtp,verifyOtp,resetpassword } from "../controllers/auth.controller.js";
import {verifyToken} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put(
   "/changepassword",
   verifyToken,
   changepassword
);
router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp);
router.patch("/resetpassword",resetpassword)

export default router;