import express from "express"
import {
  createNewEvent,
  getEvents,
  getEvent,
  updateEventById,
  deleteEventById,
} from "../controllers/event.controller.js"
import { verifyTokenMiddleware } from "../middleware/auth.middleware.js"
import upload from "../utils/multer.js"

const router = express.Router()

router.post("/", verifyTokenMiddleware, upload.single("poster"), createNewEvent)
router.get("/", verifyTokenMiddleware, getEvents)
router.get("/:id", verifyTokenMiddleware, getEvent)
router.patch("/:id", verifyTokenMiddleware, upload.single("poster"), updateEventById)
router.delete("/:id", verifyTokenMiddleware, deleteEventById)

export default router

