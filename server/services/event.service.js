import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createEvent = async (eventData) => {
  return await prisma.event.create({
    data: eventData,
  })
}

export const getAllEvents = async (role,id) => {
  if(role == "organizer"){
    return await prisma.event.findMany({where : {organizerId: id}, include : {bookings : { include: {client : true} } }})
  }
  return await prisma.event.findMany({include : {bookings : true }})
}

export const getEventById = async (id) => {
  return await prisma.event.findUnique({
    where: { id },
  })
}

export const updateEvent = async (id, eventData) => {
  return await prisma.event.update({
    where: { id },
    data: eventData,
  })
}

export const deleteEvent = async (id) => {
  return prisma.event.delete({
    where: { id },
  })
}

export const updateEventSeats = async (eventId, seats, quantity, action) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { totalSeats: true, totalTicketsSold : true },
  })

  if (!event) throw new Error('Event not found')

  let updatedTotalSeats
  if (action === 'add') {
    updatedTotalSeats = [...new Set([...event.totalSeats, ...seats])]
  } else if (action === 'remove') {
    updatedTotalSeats = event.totalSeats.filter(seat => !seats.includes(seat))
  } else {
    throw new Error('Invalid action')
  }

  const currentTotal = Number.parseInt(event.totalTicketsSold || "0")
  const updatedTotal = action === "add" ? currentTotal + quantity : currentTotal - quantity

  return await prisma.event.update({
    where: { id: eventId },
    data: {
      totalSeats: updatedTotalSeats,
      totalTicketsSold: updatedTotal.toString(),
    },
  })

}