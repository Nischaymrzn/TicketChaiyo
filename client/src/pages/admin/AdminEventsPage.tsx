import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { EventTypeSelector } from "../organizer/_components/EventTypeSelector" 
import { MovieForm } from "../organizer/_components/MovieForm" 
import { ConcertForm } from "../organizer/_components/ConcertForm"
import type { MovieFormData, ConcertFormData } from "../organizer/_schema"
import { useGetOrganizerEvents, useCreateEvent } from "@/hooks/useEvent"
import { useUpdateEvent, useDeleteEvent } from "@/hooks/useEvent"
import { EventCard } from "../organizer/_components/EventCard" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type EventType = "MOVIE" | "CONCERT"

interface Event {
  id: string
  title: string
  type: EventType
  duration: string | null
  genre: string | null
  director: string | null
  cast: string | null
  poster: string | null
  cardImage: string | null
  ticketPriceNormal: string
  ticketPriceVip: string
  date: string | null
  venue: string | null
  artist: string | null
  createdDate: string
  description: string | null
  totalSeats: string[]
  totalTicketsSold: string | null
}

export const AdminEventsPage = () => {
  const { data, isLoading, error } = useGetOrganizerEvents()
  const createEventMutation = useCreateEvent()
  const updateEventMutation = useUpdateEvent()
  const deleteEventMutation = useDeleteEvent()
  const eventsData = data?.events.filter((event : any) => event.isAccepted === true) ?? []
  const [isOpen, setIsOpen] = useState(false)
  const [eventType, setEventType] = useState<EventType | null>(null)
  const [filter, setFilter] = useState<"ALL" | EventType>("ALL")
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const handleEventTypeSelect = (type: EventType) => {
    setEventType(type)
  }

  const handleCreateEvent = async (formData: MovieFormData | ConcertFormData) => {
    if (!eventType) return

    try {
      await createEventMutation.mutateAsync({ formData, eventType })
      handleDialogClose()
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  const handleUpdateEvent = async (formData: MovieFormData | ConcertFormData) => {
    if (!editingEvent) return

    try {
      await updateEventMutation.mutateAsync({
        eventId: editingEvent.id,
        formData,
        eventType: editingEvent.type,
      })
      handleDialogClose()
    } catch (error) {
      console.error("Error updating event:", error)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEventMutation.mutateAsync(eventId)
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const handleDialogClose = () => {
    setIsOpen(false)
    setEventType(null)
    setEditingEvent(null)
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setEventType(event.type)
    setIsOpen(true)
  }

  const filteredEvents = eventsData?.filter((event: Event) => filter === "ALL" || event.type === filter) || []

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading events</div>

  return (
    <div className="text-gray-300 w-full h-full flex flex-col space-y-6">
      <div className="flex justify-between sm:items-center sm:flex-row flex-col">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm md:text-base text-gray-400">Monitor all the events here</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] bg-[#1C1C24] border-[#1F1F2C] text-white p-0">
            {!eventType ? (
              <EventTypeSelector onSelect={handleEventTypeSelect} />
            ) : eventType === "MOVIE" ? (
              <MovieForm
                onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
                onCancel={handleDialogClose}
                initialData={editingEvent as any}
              />
            ) : (
              <ConcertForm
                onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
                onCancel={handleDialogClose}
                initialData={editingEvent as any}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-end mb-4">
        <Select value={filter} onValueChange={(value: "ALL" | EventType) => setFilter(value)}>
          <SelectTrigger className="w-[180px] bg-[#1C1C24] border-[#2C2C35] text-gray-200">
            <SelectValue placeholder="Filter events" />
          </SelectTrigger>
          <SelectContent className="bg-[#1C1C24] border-[#2C2C35] text-gray-200">
            <SelectItem value="ALL">All Events</SelectItem>
            <SelectItem value="MOVIE">Movies</SelectItem>
            <SelectItem value="CONCERT">Concerts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredEvents.map((event: Event) => (
          <EventCard key={event.id} event={event} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
        ))}
      </div>
    </div>
  )
}

