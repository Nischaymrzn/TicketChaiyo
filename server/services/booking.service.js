import prisma from "../db/prisma.js"

export const createBooking = async ({ clientId, eventId, seats, price,quantity }) => {
  return await prisma.booking.create({
    data: {
      clientId,
      eventId,
      seats,
      quantity,
      price,
    },
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
    include: { event: {
        select : {
            id : true,
            title : true,
            type : true,
            venue : true,
            artist : true
        }
    } },
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