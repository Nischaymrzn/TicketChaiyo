import { createBooking, cancelBooking, getBookingById, getBookingsByUser, getBookingsByEvent } from "../services/booking.service.js"
import { validateBooking } from "../utils/validation.js"
import { updateEventSeats } from "../services/event.service.js"

export const createBookingController = async (req, res) => {
  try {
    const { clientId, eventId, seats, price, quantity } = req.body

    const validationError = validateBooking(clientId, eventId, seats, price)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }

    console.log("now creating...")
    const booking = await createBooking({ clientId, eventId, seats, price, quantity })
    await updateEventSeats(eventId, seats, quantity, "add")

    res.status(201).json({ success: true, booking })
  } catch (err) {
    console.error("Error creating booking:", err)
    res.status(500).json({ error: "Internal error" })
  }
}

export const cancelBookingController = async (req, res) => {
  try {
    const { id } = req.params

    const booking = await getBookingById(id)
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" })
    }

    await cancelBooking(id)
    await updateEventSeats(booking.eventId, booking.seats, booking.quantity, "remove")

    res.status(200).json({ success: true, message: "Booking cancelled successfully" })
  } catch (err) {
    console.error("Error cancelling booking:", err)
    res.status(500).json({ error: "Internal error" })
  }
}

export const getUserBookingsController = async (req, res) => {
  try {
    const { userId } = req.params

    const bookings = await getBookingsByUser(userId)
    res.status(200).json({ success: true, bookings })
  } catch (err) {
    console.error("Error fetching user bookings:", err)
    res.status(500).json({ error: "Internal error" })
  }
}

export const getEventBookingsController = async (req, res) => {
  try {
    const { eventId } = req.params

    const bookings = await getBookingsByEvent(eventId)
    res.status(200).json({ success: true, bookings })
  } catch (err) {
    console.error("Error fetching event bookings:", err)
    res.status(500).json({ error: "Internal error" })
  }
}