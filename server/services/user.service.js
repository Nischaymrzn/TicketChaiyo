import prisma from "../db/prisma.js"
import bcrypt from "bcrypt"

export const createUser = async ({ fullName, email, userName, password, userRole }) => {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  return await prisma.user.create({
    data: {
      name: fullName,
      username: userName,
      email: email,
      password: hash,
      userRole: userRole,
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
      userRole: true,
    },
  })
}

