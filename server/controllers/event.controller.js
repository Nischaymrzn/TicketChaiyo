import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from "../services/event.service.js"
import { validateEvent } from "../utils/validation.js"
import { uploadToCloudinary } from "../utils/cloudinary.js"
import { findUserById } from "../services/user.service.js"

export const createNewEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const validationError = validateEvent(eventData);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    if (req.files) {
      if (req.files.poster) {
        const posterResult = await uploadToCloudinary(req.files.poster[0].path);
        eventData.poster = posterResult.secure_url;
      }
      if (req.files.cardImage) {
        const cardImageResult = await uploadToCloudinary(req.files.cardImage[0].path);
        eventData.cardImage = cardImageResult.secure_url;
      }
    }

    eventData.organizerId = req.user.id;
    const event = await createEvent(eventData);
    res.status(201).json({ success: "Event created successfully", event });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Internal error" });
  }
};


export const getEvents = async (req, res) => {
  const id = req.user.id;
  const user = await findUserById(id)

  try {
    const events = await getAllEvents(user.userRole,user.id)
    res.status(200).json({ events })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    })
  }
}

export const getEvent = async (req, res) => {
  try {
    const event = await getEventById(req.params.id)
    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }
    res.status(200).json({ event })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    })
  }
}

export const updateEventById = async (req, res) => {
    try {
      const eventData = req.body;

      if (req.file) {
        const result = await uploadToCloudinary(req.file.path);
        eventData.poster = result.secure_url;
      }

      const event = await updateEvent(req.params.id, eventData);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
  
      res.status(200).json({ success: "Event updated successfully", event });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message || "Something went wrong",
      });
    }
};
  

export const deleteEventById = async (req, res) => {
  try {
    const event = await deleteEvent(req.params.id)
    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }
    res.status(200).json({ success: "Event deleted successfully" })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    })
  }
}

