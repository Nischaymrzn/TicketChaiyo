import { createBooking, cancelBooking, getBookingById, getBookingsByUser, getBookingsByEvent, updateBooking } from "../services/booking.service.js"
import { validateBooking } from "../utils/validation.js"
import { updateEventSeats } from "../services/event.service.js"

export const createBookingController = async (req, res) => {
  try {
    const { clientId, eventId, seats, price, quantity, name, email, country, state, city,normalTicketQty, vipTicketQty } = req.body
    const validationError = validateBooking(clientId, eventId, seats, price)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }
    const booking = await createBooking({ clientId, eventId, seats, price, quantity, name, email, country, state, city, normalTicketQty, vipTicketQty })
    await updateEventSeats(eventId, seats, quantity, "add")

    res.status(201).json({ success: true, booking })
  } catch (err) {
    res.status(500).json({ error: "Internal error" })
  }
}

export const updateBookingById = async (req, res) => {
  try {
    const bookingData = req.body;
    const event = await updateBooking(req.params.id, bookingData);
    if (!event) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({ success: "Booking updated successfully", event });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

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
    res.status(500).json({ error: "Internal error" })
  }
}

export const getUserBookingsController = async (req, res) => {
  try {
    const { userId } = req.params

    const bookings = await getBookingsByUser(userId)
    res.status(200).json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ error: "Internal error" })
  }
}

export const getEventBookingsController = async (req, res) => {
  try {
    const { eventId } = req.params

    const bookings = await getBookingsByEvent(eventId)
    res.status(200).json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ error: "Internal error" })
  }
}

export const getEventBookingById = async (req, res) => {
  try {
    const { id } = req.params
    const bookings = await getBookingById(id)
    res.status(200).json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ error: "Internal error" })
  }
}