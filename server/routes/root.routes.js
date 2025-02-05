import express from "express"
import authRoutes from "./auth.routes.js"
import eventRoutes from "../routes/event.routes.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/events", eventRoutes)

export default router

