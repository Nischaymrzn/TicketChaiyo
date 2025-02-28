import { createNewEvent, getEvents, getEvent, updateEventById, deleteEventById } from "../controllers/event.controller.js";
import * as eventService from "../services/event.service.js";
import * as validation from "../utils/validation.js";
import * as cloudinaryUtil from "../utils/cloudinary.js";
import { findUserById } from "../services/user.service.js";

describe("Event Controller", () => {
  let req, res;
  beforeEach(() => {
    req = { body: {}, params: {}, files: {}, user: { id: "testUserId" } };
    res = { status: jest.fn(() => res), json: jest.fn() };
  });

  describe("createNewEvent", () => {
    it("should return 400 if validation fails", async () => {
      jest.spyOn(validation, "validateEvent").mockReturnValue("Validation error");
      await createNewEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Validation error" });
    });

    it("should create an event successfully without files", async () => {
      jest.spyOn(validation, "validateEvent").mockReturnValue(null);
      req.body = { title: "Test Event" };
      jest.spyOn(eventService, "createEvent").mockResolvedValue({ id: "event1", title: "Test Event" });
      
      await createNewEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: "Event created successfully",
        event: { id: "event1", title: "Test Event" }
      });
    });

    it("should create an event successfully with files", async () => {
      jest.spyOn(validation, "validateEvent").mockReturnValue(null);
      req.body = { title: "Test Event" };
      req.files = {
        poster: [{ path: "posterPath" }],
        cardImage: [{ path: "cardImagePath" }]
      };
      jest.spyOn(cloudinaryUtil, "uploadToCloudinary")
        .mockImplementationOnce(async (path) => ({ secure_url: "posterUrl" }))
        .mockImplementationOnce(async (path) => ({ secure_url: "cardImageUrl" }));
      jest.spyOn(eventService, "createEvent").mockResolvedValue({
        id: "event2",
        title: "Test Event",
        poster: "posterUrl",
        cardImage: "cardImageUrl"
      });
      
      await createNewEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: "Event created successfully",
        event: { id: "event2", title: "Test Event", poster: "posterUrl", cardImage: "cardImageUrl" }
      });
    });
  });

  describe("getEvents", () => {
    it("should return events", async () => {
      jest.spyOn(require("../services/user.service.js"), "findUserById").mockResolvedValue({ id: "testUserId", userRole: "organizer" });
      jest.spyOn(eventService, "getAllEvents").mockResolvedValue([{ id: "e1" }]);
      
      await getEvents(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ events: [{ id: "e1" }] });
    });
  });

  describe("getEvent", () => {
    it("should return 404 if event not found", async () => {
      req.params.id = "1";
      jest.spyOn(eventService, "getEventById").mockResolvedValue(null);
      await getEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Event not found" });
    });

    it("should return event if found", async () => {
      req.params.id = "1";
      const eventData = { id: "1", title: "Test Event" };
      jest.spyOn(eventService, "getEventById").mockResolvedValue(eventData);
      await getEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ event: eventData });
    });
  });

  describe("updateEventById", () => {
    it("should return 404 if event not found", async () => {
      req.params.id = "1";
      jest.spyOn(eventService, "updateEvent").mockResolvedValue(null);
      await updateEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Event not found" });
    });

    it("should update event successfully without files", async () => {
      req.params.id = "1";
      req.body = { title: "Updated Event" };
      const updatedEvent = { id: "1", title: "Updated Event" };
      jest.spyOn(eventService, "updateEvent").mockResolvedValue(updatedEvent);
      await updateEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: "Event updated successfully", event: updatedEvent });
    });
  });

  describe("deleteEventById", () => {
    it("should return 404 if event not found", async () => {
      req.params.id = "1";
      jest.spyOn(eventService, "deleteEvent").mockResolvedValue(null);
      await deleteEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Event not found" });
    });

    it("should delete event successfully", async () => {
      req.params.id = "1";
      jest.spyOn(eventService, "deleteEvent").mockResolvedValue({ id: "1" });
      await deleteEventById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: "Event deleted successfully" });
    });
  });
});
