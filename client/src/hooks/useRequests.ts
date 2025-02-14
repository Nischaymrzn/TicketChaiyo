import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import authenticatedApi from "@/api"
import { toast } from "sonner"

export const useGetRequests = () => {
    return useQuery({
      queryKey: ["requests"],
      queryFn: async () => {
        const response = await authenticatedApi.get("/requests")
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

  export const useAcceptUser = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async ({
        userId,
        userData,
      }: {
        userId: string
        userData: any 
      }) => {
  
        const response = await authenticatedApi.patch(`/requests/acceptUser/${userId}`, userData)
        return response.data
      },
      onSuccess: (response) => {
        toast.success(response.success)
        queryClient.invalidateQueries({ queryKey: ["requests"] });
      },
    })
  }

  export const useAcceptEvent = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async ({
        eventId,
        eventData,
      }: {
        eventId: string
        eventData: any 
      }) => {
  
        const response = await authenticatedApi.patch(`/requests/acceptEvent/${eventId}`, eventData)
        return response.data
      },
      onSuccess: () => {
        toast.success("User rejected")
        queryClient.invalidateQueries({ queryKey: ["requests"] });
      },
    })
  }