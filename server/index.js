import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import rootRouter from "./routes/root.routes.js"

dotenv.config()

const app = express()
app.use(cors()) // Enable CORS

const PORT = process.env.PORT || 3003

// Use express.urlencoded to parse form data
app.use(express.urlencoded({ extended: true }))

// Use express.json to parse JSON request bodies
app.use(express.json())
// Set up routes
app.use("/api", rootRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

