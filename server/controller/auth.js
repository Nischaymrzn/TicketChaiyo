import express, { json } from "express";
import prisma from '../db/prisma.js'
import bcrypt from "bcrypt"
import validator from "validator"
import { createToken, verifyToken } from "../service/auth.js";

async function handleSignup(req, res) {
    const { fullName, email, userName, password, userRole } = req.body;
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error("Not a valid email")
    }
    const user = await prisma.user.findUnique({
        where: {
          email: email,
        }
    });
    if(user){
        return res.status(409).json({
            "status": "error",
            "message": "User already exists with the provided email."
          })
    }

    try {
        const salt = await bcrypt.genSalt()
        const hash = await bcrypt.hash(password,salt)
        await prisma.user.create({
        data: {
          name: fullName,
          username : userName,
          email: email,
          password: hash,
          userRole : userRole
        },
      });
      return res.status(200).json({ success: "User created successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Internal error" });
    }
  }

async function handleLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password){
        return res.json({error:'All fields must be filled'})
    }

    if (!validator.isEmail(email)){
        return res.json({error:"Not a valid email"})
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        }
      });
      
      if (user) {
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.json({error:"Incorrect password"})
        }

        const token=createToken(user.id)

        return res.status(200).json({
          user :{
            id : user.id,
            email : email,
            name : user.name
          },
          accessToken : token
        });
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message || 'Something went wrong'
      });
    }
}

async function handleGetMe(req, res) {
  const token = req.headers['authorization'].split(' ')[1];
  try {
  const user = await verifyToken(token);
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      name: true,
      userRole : true,
    }
  });
  
  return res.status(200).json({ data: userData , message : "user fetched successfully"});
}catch(err){
  return res.status(401).json({data:null})
}
}

 export { handleSignup, handleLogin, handleGetMe };