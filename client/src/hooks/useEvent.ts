import { useQuery } from "@tanstack/react-query"
import authenticatedApi from "@/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { MovieFormData, ConcertFormData } from "../pages/organizer/_schema"

type EventType = "MOVIE" | "CONCERT"

export const useGetEvents = () => {
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
  
  export const useCreateEvent = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (data: {
        formData: MovieFormData | ConcertFormData
        eventType: EventType
      }) => {
        const formDataToSend = new FormData()
  
        Object.entries(data.formData).forEach(([key, value]) => {
          if (key === "date" && value instanceof Date) {
            formDataToSend.append(key, value.toISOString())
          } else if (value instanceof File) {
            formDataToSend.append(key, value)
          } else {
            formDataToSend.append(key, String(value))
          }
        })
  
        formDataToSend.append("type", data.eventType)
  
        const response = await authenticatedApi.post("/events", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
  
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] })
      },
    })
  }

  export const useUpdateEvent = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async ({
        eventId,
        formData,
        eventType,
      }: {
        eventId: string
        formData: MovieFormData | ConcertFormData
        eventType: EventType
      }) => {
        const formDataToSend = new FormData()
  
        Object.entries(formData).forEach(([key, value]) => {
          if (key === "date" && value instanceof Date) {
            formDataToSend.append(key, value.toISOString())
          } else if (value instanceof File) {
            formDataToSend.append(key, value)
          } else if (value !== null && value !== undefined) {
            formDataToSend.append(key, String(value))
          }
        })
  
        formDataToSend.append("type", eventType)
  
        const response = await authenticatedApi.patch(`/events/${eventId}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
  
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] })
      },
    })
  }
  
  export const useDeleteEvent = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: async (eventId: string) => {
        const response = await authenticatedApi.delete(`/events/${eventId}`)
        return response.data
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["events"] })
      },
    })
  }
