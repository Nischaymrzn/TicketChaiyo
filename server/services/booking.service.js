import prisma from "../db/prisma.js"

export const createBooking = async ({ clientId, eventId, seats, price,quantity, name, email, country, state, city, normalTicketQty, vipTicketQty }) => {
  return await prisma.booking.create({
    data: {
      clientId,
      eventId,
      seats,
      quantity,
      price,
      name,
      email,
      country,
      state,
      city,
      normalTicketQty, 
      vipTicketQty
    },
  })
}

export const updateBooking = async (id, bookingData) => {
  return await prisma.booking.update({
    where: { id },
    data: bookingData,
  })
}


export const cancelBooking = async (id) => {
  return await prisma.booking.delete({
    where: { id },
  })
}

export const getBookingById = async (id) => {
  return await prisma.booking.findUnique({
    where: { id },
  })
}

export const getBookingsByUser = async (userId) => {
  return await prisma.booking.findMany({
    where: { clientId: userId },
    include: { event: true },
  })
}

export const getBookingsByEvent = async (eventId) => {
  return await prisma.booking.findMany({
    where: { eventId },
    include: { 
      client: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: { bookedAt: 'desc' }
  })
}