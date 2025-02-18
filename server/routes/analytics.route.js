import express from "express";
import { getOrganizerDashboardAnalytics, getOrganizerSalesAnalytics, getAdminDashboardAnalytics } from "../controllers/analytics.controller.js" 
import { verifyTokenMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/admin/:adminId", verifyTokenMiddleware, getAdminDashboardAnalytics);
router.get("/organizer/:organizerId", verifyTokenMiddleware, getOrganizerDashboardAnalytics);
router.get("/organizerSales/:organizerId", verifyTokenMiddleware, getOrganizerSalesAnalytics);

export default router;
