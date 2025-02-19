import { getOrganizerAnalyticsDashboard, getOrganizerSalesData, getAdminDashboardAnalyticsData } from "../services/analytics.service.js";

export const getAdminDashboardAnalytics = async (req, res) => {
    try {
      const { adminId } = req.params;
      const dashboardAnalyticsData = await getAdminDashboardAnalyticsData(adminId);
      res.json(dashboardAnalyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

export const getOrganizerDashboardAnalytics = async (req, res) => {
    try {
      const { organizerId } = req.params;
      console.log(organizerId)
      const dashboardAnalyticsData = await getOrganizerAnalyticsDashboard(organizerId);
      res.json(dashboardAnalyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  export const getOrganizerSalesAnalytics = async (req, res) => {
    try {
      const { organizerId } = req.params;
      const dashboardAnalyticsData = await getOrganizerSalesData(organizerId);
      res.json(dashboardAnalyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

