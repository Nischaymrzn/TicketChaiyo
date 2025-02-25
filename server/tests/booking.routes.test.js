import request from "supertest";
import express from "express";
import bookingRoutes from "../routes/booking.routes.js";

jest.mock("../controllers/booking.controller.js", () => ({
  createBookingController: jest.fn((req, res) =>
    res.status(201).json({ message: "Booking created" })
  ),
  cancelBookingController: jest.fn((req, res) =>
    res.status(200).json({ message: "Booking cancelled successfully" })
  ),
  updateBookingById: jest.fn((req, res) =>
    res.status(200).json({ message: "Booking updated successfully" })
  ),
  getEventBookingById: jest.fn((req, res) =>
    res.status(200).json({ message: "Single booking" })
  ),
  getUserBookingsController: jest.fn((req, res) =>
    res.status(200).json({ message: "User bookings" })
  ),
  getEventBookingsController: jest.fn((req, res) =>
    res.status(200).json({ message: "Event bookings" })
  ),
}));

jest.mock("../middleware/auth.middleware.js", () => ({
  verifyTokenMiddleware: (req, res, next) => {
    req.user = { id: "testUserId" };
    next();
  },
}));

const app = express();
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

describe("Booking Routes", () => {
  test("POST /api/bookings - create booking", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .send({
        clientId: "client1",
        eventId: "event1",
        seats: ["A1"],
        price: 100,
        quantity: 1,
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Booking created");
  });

  test("DELETE /api/bookings/:id - cancel booking", async () => {
    const res = await request(app).delete("/api/bookings/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Booking cancelled successfully");
  });

  test("PATCH /api/bookings/:id - update booking", async () => {
    const res = await request(app)
      .patch("/api/bookings/1")
      .send({ quantity: 2 });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Booking updated successfully");
  });

  test("GET /api/bookings/:id - get booking by id", async () => {
    const res = await request(app).get("/api/bookings/1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Single booking");
  });

  test("GET /api/bookings/user/:userId - get user bookings", async () => {
    const res = await request(app).get("/api/bookings/user/client1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User bookings");
  });

  test("GET /api/bookings/event/:eventId - get event bookings", async () => {
    const res = await request(app).get("/api/bookings/event/event1");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Event bookings");
  });
});
