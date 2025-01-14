import express from "express";
import { handleGetMe, handleLogin,handleSignup } from "../controller/auth.js";

const router = express.Router();

router.post('/register', handleSignup);
router.post('/login', handleLogin);
router.get('/getMe',handleGetMe)

export default router;
