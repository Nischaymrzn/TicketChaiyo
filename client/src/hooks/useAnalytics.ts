import authenticatedApi from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAdminDashboardAnalytics = (adminId : string) => {
    return useQuery({
      queryKey: ["analytics"],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/analytics/admin/${adminId}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

export const useGetOrganizerDashboardAnalytics = (organizerId : string) => {
    return useQuery({
      queryKey: ["analytics"],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/analytics/organizer/${organizerId}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

  export const useGetOrganizerSalesAnalytics = (organizerId : string) => {
    return useQuery({
      queryKey: ["analytics"],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/analytics/organizerSales/${organizerId}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }