import authenticatedApi from "@/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export interface BookingData {
    quantity: number
    seats: string[]
    price: number
    name?: string
    email?: string
    country?: string
    state?: string
    city?: string
    clientId: string
    eventId: string
    normalTicketQty : number
    vipTicketQty : number
}
  
export const useAddBooking = () => {
    return useMutation({
      mutationFn: async (data: BookingData) => {
        const response = await authenticatedApi.post("/bookings", data)
        return response?.data?.booking
      },
      onSuccess: () => {
        toast.success("Booking confirmed")
      },
    })
  }
  
  export const useGetBooking = (id : string) => {
    return useQuery({
      queryKey: ["bookings",id],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/bookings/${id}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

  export const useGetUsersBookings = (id : string) => {
    return useQuery({
      queryKey: ["bookings"],
      queryFn: async () => {
        const response = await authenticatedApi.get(`/bookings/user/${id}`)
        return response.data
      },
      enabled: !!localStorage.getItem("accessToken"), 
      retry: false,
    })
  }

  export const useUpdateBooking = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async ({
        bookingId,
        formData,
      }: {
        bookingId: string
        formData: any 
      }) => {
  
        const response = await authenticatedApi.patch(`/bookings/${bookingId}`, formData)
        return response.data
      },
      onSuccess: (response) => {
        toast.success(response.success)
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
    })
  }
  
  export const useDeleteBooking = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (bookingId: string) => {
        const response = await authenticatedApi.delete(`/bookings/${bookingId}`)
        return response.data
      },
      onSuccess: (response) => {
        toast.success(response.message)
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },
    })
  }