import { getOrganizerAnalyticsDashboard, getOrganizerSalesData, getAdminDashboardAnalyticsData } from "../services/analytics.service.js";

export const getAdminDashboardAnalytics = async (req, res) => {
    try {
      const { id } = req.params;
      const dashboardAnalyticsData = await getAdminDashboardAnalyticsData(id);
      res.json(dashboardAnalyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

export const getOrganizerDashboardAnalytics = async (req, res) => {
    try {
      const { id } = req.params;
      const dashboardAnalyticsData = await getOrganizerAnalyticsDashboard(id);
      res.json(dashboardAnalyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  export const getOrganizerSalesAnalytics = async (req, res) => {
    try {
      const { id } = req.params;
      const dashboardAnalyticsData = await getOrganizerSalesData(id);
      res.json(dashboardAnalyticsData);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

