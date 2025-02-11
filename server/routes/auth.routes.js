import express from "express"
import { signup, login, getMe } from "../controllers/auth.controller.js"
import { verifyTokenMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", signup)
router.post("/login", login)
router.get("/getMe", verifyTokenMiddleware, getMe)

export default router

