import { getAllUsers, getAllCustomers, getAllOrganizers, deleteUserById, updateUserById, findUserByEmail, createUser } from "../services/user.service.js"
import { validateSignup } from "../utils/validation.js"

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    })
  }
}

export const getCustomers = async (req, res) => {

    try {
      const users = await getAllCustomers()
      res.status(200).json({ users })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Something went wrong",
      })
    }
  }

  export const getOrganizers = async (req, res) => {

    try {
      const users = await getAllOrganizers()
      res.status(200).json({ users })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Something went wrong",
      })
    }
  }

  export const createOrganizers = async (req, res) => {
    try {
      const { fullName, email, userName, password } = req.body
      const userRole = "organizer"
      const validationError = validateSignup(fullName, email, userName, password)
      if (validationError) {
        return res.status(400).json({ error: validationError })
      }
      const existingUser = await findUserByEmail(email)
      if (existingUser) {
        return res.status(409).json({
          status: "error",
          message: "Organizer already exists with the provided email.",
        })
      }
      const isAccepted = true;
      const user = await createUser({ fullName, email, userName, password, userRole, isAccepted })
      res.status(201).json({ success: "Organizer created successfully" })
    } catch (err) {
      res.status(500).json({ error: "Internal error" })
    }
  }

  export const updateUser = async (req, res) => {
      try {
        const userData = req.body;
        const user = await updateUserById(req.params.id, userData);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ success: "User updated successfully", user });
      } catch (error) {
        res.status(500).json({
          status: "error",
          message: error.message || "Something went wrong",
        });
      }
  };

  export const deleteUser = async (req, res) => {
    try {
      const user = await deleteUserById(req.params.id)
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json({ success: "User deleted successfully" })
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Something went wrong",
      })
    }
  }