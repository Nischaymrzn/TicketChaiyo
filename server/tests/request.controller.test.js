import { getAllRequests, acceptUser, acceptEvent } from "../controllers/request.controller.js";
import * as requestService from "../services/request.service.js";
import * as userService from "../services/user.service.js";
import * as eventService from "../services/event.service.js";

describe("Request Controller", () => {
  let req, res;
  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { status: jest.fn(() => res), json: jest.fn() };
  });

  describe("getAllRequests", () => {
    it("should return requests on success", async () => {
      const requests = [{ id: "1", requestType: "organizer" }];
      jest.spyOn(requestService, "fetchAllRequests").mockResolvedValue(requests);
      
      await getAllRequests(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ requests });
    });

    it("should return 500 on error", async () => {
      jest.spyOn(requestService, "fetchAllRequests").mockRejectedValue(new Error("Error"));
      
      await getAllRequests(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
  });

  describe("acceptUser", () => {
    it("should return 404 if user not found", async () => {
      req.params.id = "1";
      req.body = { isAccepted: true };
      jest.spyOn(userService, "updateUserById").mockResolvedValue(null);
      
      await acceptUser(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("should accept user successfully", async () => {
      req.params.id = "1";
      req.body = { isAccepted: "true" };
      const user = { id: "1", isAccepted: true };
      jest.spyOn(userService, "updateUserById").mockResolvedValue(user);
      
      await acceptUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: "User accepted successfully", user });
    });

    it("should handle error in acceptUser", async () => {
      req.params.id = "1";
      req.body = { isAccepted: true };
      jest.spyOn(userService, "updateUserById").mockRejectedValue(new Error("Error"));
      
      await acceptUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Error",
      });
    });
  });

  describe("acceptEvent", () => {
    it("should return 404 if event not found", async () => {
      req.params.id = "1";
      req.body = { isAccepted: true };
      jest.spyOn(eventService, "updateEvent").mockResolvedValue(null);
      
      await acceptEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Event not found" });
    });

    it("should accept event successfully", async () => {
      req.params.id = "1";
      req.body = { isAccepted: "true" };
      const event = { id: "1", isAccepted: true };
      jest.spyOn(eventService, "updateEvent").mockResolvedValue(event);
      
      await acceptEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: "Event accepted successfully", user: event });
    });

    it("should handle error in acceptEvent", async () => {
      req.params.id = "1";
      req.body = { isAccepted: true };
      jest.spyOn(eventService, "updateEvent").mockRejectedValue(new Error("Error"));
      
      await acceptEvent(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: "error",
        message: "Error",
      });
    });
  });
});
