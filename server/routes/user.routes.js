import express from "express"
import {
    createOrganizers,
    deleteUser,
    getCustomers,
    getOrganizers,
    getUsers,
    updateUser
} from "../controllers/user.controller.js"
import { verifyTokenMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", verifyTokenMiddleware, getUsers)
router.get("/customers", verifyTokenMiddleware, getCustomers)
router.get("/organizers", verifyTokenMiddleware, getOrganizers)
router.delete("/:id",verifyTokenMiddleware,deleteUser)
router.patch("/:id",verifyTokenMiddleware,updateUser)
router.post("/createOrganizers",verifyTokenMiddleware,createOrganizers)

export default router

