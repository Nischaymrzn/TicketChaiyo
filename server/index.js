import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import rootRouter from "./routes/root.routes.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json()) // This adds JSON parsing middleware
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000

// Routes
app.use("/api", rootRouter)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

