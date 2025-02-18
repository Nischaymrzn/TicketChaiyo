import authenticatedApi from "@/api"
import { useQuery } from "@tanstack/react-query"

export const useGetAdminDashboardAnalytics = (id : string) => {
    return useQuery({
      queryKey: ["analytics"],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/analytics/admin/${id}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

export const useGetOrganizerDashboardAnalytics = (id : string) => {
    return useQuery({
      queryKey: ["analytics"],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/analytics/organizer/${id}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

  export const useGetOrganizerSalesAnalytics = (id : string) => {
    return useQuery({
      queryKey: ["analytics"],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/analytics/organizerSales/${id}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }