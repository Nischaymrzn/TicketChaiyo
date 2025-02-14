import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import authenticatedApi from "@/api"
import { toast } from "sonner"

export const useGetOrganizers = () => {
    return useQuery({
      queryKey: ["user-organizer"],
      queryFn: async () => {
        const response = await authenticatedApi.get("/users/organizers")
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

export const useGetCustomers = () => {
    return useQuery({
      queryKey: ["user-customer"],
      queryFn: async () => {
        const response = await authenticatedApi.get("/users/customers")
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

  export const useUpdateUser = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async ({
        userId,
        userData,
      }: {
        userId: string
        userData: any 
      }) => {
  
        const response = await authenticatedApi.patch(`/users/${userId}`, userData)
        return response.data
      },
      onSuccess: (response) => {
        toast.success(response.success)
        queryClient.invalidateQueries({ queryKey: ["user-customer"] });
        queryClient.invalidateQueries({ queryKey: ["user-organizer"] });
      },
    })
  }
  
  export const useDeleteUser = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (userId: string) => {
        const response = await authenticatedApi.delete(`/users/${userId}`)
        return response.data
      },
      onSuccess: (response) => {
        toast.success(response.success)
        queryClient.invalidateQueries({ queryKey: ["user-customer"] });
        queryClient.invalidateQueries({ queryKey: ["user-organizer"] });
      },
    })
  }
