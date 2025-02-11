import { useQuery } from "@tanstack/react-query"
import authenticatedApi from "@/api"

export const useGetOrganizerEvents = () => {
    return useQuery({
      queryKey: ["events"],
      queryFn: async () => {
        const response = await authenticatedApi.get("/events")
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }
  
