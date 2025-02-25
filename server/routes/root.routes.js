import express from "express"
import authRoutes from "./auth.routes.js"
import eventRoutes from "../routes/event.routes.js"
import bookingRoutes from "./booking.routes.js"
import userRoutes from "./user.routes.js"
import requestRoutes from "./request.routes.js"
import analyticsRoutes from "./analytics.route.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/events", eventRoutes)
router.use("/bookings", bookingRoutes)
router.use("/users",userRoutes)
router.use("/requests",requestRoutes)
router.use("/analytics",analyticsRoutes)

export default router

