import express from "express"
import { 
  createBookingController, 
  cancelBookingController, 
  getUserBookingsController,
  getEventBookingsController,
  getEventBookingById,
  updateBookingById
} from "../controllers/booking.controller.js"
import { verifyTokenMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/", verifyTokenMiddleware, createBookingController)
router.delete("/:id", verifyTokenMiddleware, cancelBookingController)
router.patch("/:id", verifyTokenMiddleware, updateBookingById)
router.get("/:id", verifyTokenMiddleware, getEventBookingById)
router.get("/user/:userId", verifyTokenMiddleware, getUserBookingsController)
router.get("/event/:eventId", verifyTokenMiddleware, getEventBookingsController)

export default router