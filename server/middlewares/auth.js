import { verifyToken } from "../service/auth";
import prisma from '../db/prisma.js'

const requireAuth = async (req,res,next) => {

    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: " Authorization token required "})
    }

    const token =  authorization.split(" ")[1];

    try{
        const {id} = verifyToken(token)

        req.user = await prisma.user.findUnique({
            where:{
                id : id
            },
            select: {
                id: true,
            }
        })
        next()
    }catch(error){
        console.log(error)
        return res.status(401).json({error:"Request is not authorized"})
    }
}