import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetMe } from "@/hooks/useAuth"
import { useGetUsersBookings, useUpdateBooking, useDeleteBooking } from "@/hooks/useBookings"
import { BookingCard } from "./_components/BookingCard"
import { BookingEditForm } from "./_components/BookingEditForm"
import type { BookingEditFormData } from "./_components/BookingEditForm"

type EventType = "MOVIE" | "CONCERT"

interface Booking {
  id: string
  event: {
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
  quantity: number
  price: number
  bookedAt: string
  name: string
  email: string
  country: string
  state: string
  city: string
}

export const Booking = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setFilter] = useState<"ALL" | EventType>("ALL")
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)

  const { data: user } = useGetMe()
  const userId = user?.userData?.id
  const { data: booking, isLoading, error } = useGetUsersBookings(userId)
  const updateBookingMutation = useUpdateBooking()
  const deleteBookingMutation = useDeleteBooking()

  const bookingData = booking?.bookings || []

  const handleUpdateBooking = async (formData: BookingEditFormData) => {
    if (!editingBooking) return

    try {
      await updateBookingMutation.mutateAsync({
        bookingId: editingBooking.id,
        formData,
      })
      console.log("Booking updated:", editingBooking.id, formData)
      handleDialogClose()
    } catch (error) {
      console.error("Error updating booking:", error)
    }
  }

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      await deleteBookingMutation.mutateAsync(bookingId)
      console.log("Booking deleted:", bookingId)
    } catch (error) {
      console.error("Error deleting booking:", error)
    }
  }

  const handleDialogClose = () => {
    setIsOpen(false)
    setEditingBooking(null)
  }

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking(booking)
    setIsOpen(true)
  }

  const filteredBookings = bookingData.filter((booking: Booking) => filter === "ALL" || booking.event.type === filter)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading bookings</div>

  return (
    <div className="text-gray-300 w-full h-full flex flex-col space-y-6 mb-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] bg-[#1C1C24] border-[#1F1F2C] text-white p-0">
          {editingBooking && (
            <BookingEditForm
              onSubmit={handleUpdateBooking}
              onCancel={handleDialogClose}
              initialData={{
                name: editingBooking.name,
                email: editingBooking.email,
                country: editingBooking.country,
                state: editingBooking.state,
                city: editingBooking.city,
                quantity: editingBooking.quantity,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <div className="flex justify-end mt-6">
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
        {filteredBookings.map((booking: Booking) => (
          <BookingCard key={booking.id} booking={booking} onEdit={handleEditBooking} onDelete={handleDeleteBooking} />
        ))}
      </div>
    </div>
  )
}

