import {fetchAllRequests} from "../services/request.service.js"

export const getAllRequests = async (req, res) => {
  try {
    const requests = await fetchAllRequests()
    res.status(200).json({ requests })
  } catch (error) {
    console.error("Error fetching requests:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

