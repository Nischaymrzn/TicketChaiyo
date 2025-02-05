import { createUser, findUserByEmail, findUserById } from "../services/user.service.js"
import { validateSignup, validateLogin } from "../utils/validation.js"
import { comparePasswords, createToken } from "../services/auth.service.js"

export const signup = async (req, res) => {
  try {
    const { fullName, email, userName, password, userRole } = req.body

    const validationError = validateSignup(fullName, email, userName, password)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User already exists with the provided email.",
      })
    }

    const user = await createUser({ fullName, email, userName, password, userRole })
    res.status(201).json({ success: "User created successfully" })
  } catch (err) {
    console.error("Error creating user:", err)
    res.status(500).json({ error: "Internal error" })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const validationError = validateLogin(email, password)
    if (validationError) {
      return res.status(400).json({ error: validationError })
    }

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      })
    }

    const isValidPassword = await comparePasswords(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: "Incorrect password" })
    }

    const token = createToken(user.id)

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userRole: user.userRole,
      },
      accessToken: token,
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const userData = await findUserById(req.user.id)
    res.status(200).json({ userData, message: "User fetched successfully" })
  } catch (err) {
    res.status(401).json({ data: null })
  }
}

