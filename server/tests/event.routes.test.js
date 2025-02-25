import request from "supertest";
import express from "express";
import eventRoutes from "../routes/event.routes.js";

jest.mock("../controllers/event.controller.js", () => ({
  createNewEvent: jest.fn((req, res) => res.status(201).json({ message: "Event created" })),
  getEvents: jest.fn((req, res) => res.status(200).json({ message: "All events" })),
  getEvent: jest.fn((req, res) => res.status(200).json({ message: "Single event" })),
  updateEventById: jest.fn((req, res) => res.status(200).json({ message: "Event updated" })),
  deleteEventById: jest.fn((req, res) => res.status(200).json({ message: "Event deleted" }))
}));

jest.mock("../middleware/auth.middleware.js", () => ({
  verifyTokenMiddleware: (req, res, next) => {
    req.user = { id: "testUserId" };
    next();
  }
}));

jest.mock("../utils/multer.js", () => {
  return {
    default: (req, res, next) => next(),
    fields: () => (req, res, next) => next()
  };
});

const app = express();
app.use(express.json());
app.use("/api/events", eventRoutes);

describe("Event Routes", () => {
  test("POST /api/events - create new event", async () => {
    const res = await request(app).post("/api/events").send({ title: "Test Event" });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Event created");
  });

  test("GET /api/events - get all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("All events");
  });

  test("GET /api/events/:id - get single event", async () => {
    const res = await request(app).get("/api/events/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Single event");
  });

  test("PATCH /api/events/:id - update event", async () => {
    const res = await request(app).patch("/api/events/1").send({ title: "Updated Title" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Event updated");
  });

  test("DELETE /api/events/:id - delete event", async () => {
    const res = await request(app).delete("/api/events/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Event deleted");
  });
});
