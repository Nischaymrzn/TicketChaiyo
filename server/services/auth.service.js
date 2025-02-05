import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

export const comparePasswords = async (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "3d" })
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY)
}

