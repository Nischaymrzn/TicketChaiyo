import authenticatedApi from "@/api"
import { useMutation, useQuery } from "@tanstack/react-query"
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