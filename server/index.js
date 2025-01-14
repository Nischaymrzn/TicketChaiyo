import express from 'express';
import dotenv from 'dotenv';
import prisma from './db/prisma.js';
import cors from "cors";
import authRoute from "./route/authRoute.js";

dotenv.config();

const app = express();
app.use(cors());  // Enable CORS

const PORT = process.env.PORT || 3003;

// Use express.urlencoded to parse form data
app.use(express.urlencoded({ extended: false }));

// Use express.json to parse JSON request bodies
app.use(express.json());  // You might also want to add this for parsing JSON payloads

// Set up routes
app.use('/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
