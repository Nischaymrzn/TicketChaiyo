import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createEvent = async (eventData) => {
  return await prisma.event.create({
    data: eventData,
  })
}

export const getAllEvents = async (role,id) => {
  if(role == "organizer"){
    return await prisma.event.findMany({where : {organizerId: id} })
  }
  return await prisma.event.findMany()
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

export const updateEventSeats = async (eventId, seats, action) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { totalSeats: true },
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

  return await prisma.event.update({
    where: { id: eventId },
    data: { totalSeats: updatedTotalSeats },
  })
}