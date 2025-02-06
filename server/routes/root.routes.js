import express from "express"
import authRoutes from "./auth.routes.js"
import eventRoutes from "../routes/event.routes.js"
import bookingRoutes from "./booking.routes.js"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/events", eventRoutes)
router.use("/bookings", bookingRoutes)

export default router

