import express from "express"
import { verifyTokenMiddleware } from "../middleware/auth.middleware.js"
import { acceptEvent, acceptUser, getAllRequests } from "../controllers/request.controller.js"

const router = express.Router()

router.get("/", verifyTokenMiddleware, getAllRequests)
router.patch("/acceptUser/:id", verifyTokenMiddleware, acceptUser)
router.patch("/acceptEvent/:id", verifyTokenMiddleware, acceptEvent)

export default router