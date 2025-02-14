import authenticatedApi from "@/api"
import { QueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

interface AddOrganizerData {
    fullName: string
    userName: string
    email: string
    password: string
  }
  
  export const useAddOrganizer = () => {
    const queryClient = new QueryClient()
  
    return useMutation({
      mutationFn: async (data: AddOrganizerData) => {
        const response = await authenticatedApi.post("/users/createOrganizers", data)
        return response.data
      },
      onSuccess: (response) => {
        toast.success(response.success)
        queryClient.invalidateQueries({queryKey : ['user-organizer']})
      },
    })
  }