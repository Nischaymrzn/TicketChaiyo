import { updateEvent } from "../services/event.service.js"
import {fetchAllRequests} from "../services/request.service.js"
import { updateUserById } from "../services/user.service.js"

export const getAllRequests = async (req, res) => {
  try {
    const requests = await fetchAllRequests()
    res.status(200).json({ requests })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
}

export const acceptUser = async (req, res) => {
  try {
    const {isAccepted } = req.body;

    const acceptedStatus = isAccepted === "true" || isAccepted === true;

    const user = await updateUserById(req.params.id, {isAccepted : acceptedStatus });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: "User accepted successfully", user });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};

export const acceptEvent = async (req, res) => {
  try {
    const {isAccepted } = req.body;

    const acceptedStatus = isAccepted === "true" || isAccepted === true;

    const user = await updateEvent(req.params.id, {isAccepted : acceptedStatus });
    if (!user) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json({ success: "Event accepted successfully", user });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
};