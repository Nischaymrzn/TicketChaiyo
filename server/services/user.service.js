import prisma from "../db/prisma.js"
import bcrypt from "bcrypt"

export const createUser = async ({ fullName, email, userName, password, userRole, isAccepted }) => {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  return await prisma.user.create({
    data: {
      name: fullName,
      username: userName,
      email: email,
      password: hash,
      userRole: userRole,
      isAccepted : isAccepted,
    },
  })
}

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email: email },
  })
}

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      name: true,
      username : true,
      userRole: true,
      isAccepted : true
    },
  })
}

export const getAllUsers = async () => {
  return await prisma.user.findMany()
}

export const getAllCustomers = async () => {
  return await prisma.user.findMany({where : { userRole : "client"}, include : {Booking : true}})
}

export const getAllOrganizers = async () => {
  return await prisma.user.findMany({where : { userRole : "organizer" }, include : {Event : true}})
}

export const deleteUserById = async (id) => {
  return prisma.user.delete({
    where: { id },
  })
}

export const updateUserById = async (id, userData) => {
  if (userData.password) {
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(userData.password, salt);
  }
  return await prisma.user.update({
    where: { id },
    data: userData,
  })
}