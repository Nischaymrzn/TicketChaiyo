import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();

const createToken = (id) => {
   return jwt.sign({id},process.env.SECRET_KEY,{ expiresIn: '3d'})
}

const verifyToken = (token) => {
   return jwt.verify(token, process.env.SECRET_KEY)
}

export {createToken, verifyToken}