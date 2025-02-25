import request from "supertest";
import express from "express";
import requestRoutes from "../routes/request.routes.js";

jest.mock("../controllers/request.controller.js", () => ({
  getAllRequests: jest.fn((req, res) =>
    res.status(200).json({ message: "Requests fetched" })
  ),
  acceptUser: jest.fn((req, res) =>
    res.status(200).json({ message: "User accepted successfully" })
  ),
  acceptEvent: jest.fn((req, res) =>
    res.status(200).json({ message: "Event accepted successfully" })
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
app.use("/api/requests", requestRoutes);

describe("Request Routes", () => {
  test("GET /api/requests - get all requests", async () => {
    const res = await request(app).get("/api/requests");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Requests fetched");
  });

  test("PATCH /api/requests/acceptUser/:id - accept user", async () => {
    const res = await request(app)
      .patch("/api/requests/acceptUser/1")
      .send({ isAccepted: true });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User accepted successfully");
  });

  test("PATCH /api/requests/acceptEvent/:id - accept event", async () => {
    const res = await request(app)
      .patch("/api/requests/acceptEvent/1")
      .send({ isAccepted: "true" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Event accepted successfully");
  });
});
