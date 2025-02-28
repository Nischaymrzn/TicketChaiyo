import {
    createBookingController,
    updateBookingById,
    cancelBookingController,
    getUserBookingsController,
    getEventBookingsController,
    getEventBookingById,
  } from "../controllers/booking.controller.js";
  import * as bookingService from "../services/booking.service.js";
  import * as eventService from "../services/event.service.js";
  
  describe("Booking Controller", () => {
    let req, res;
    beforeEach(() => {
      req = { body: {}, params: {}, user: { id: "testUserId" } };
      res = { status: jest.fn(() => res), json: jest.fn() };
    });
  
    describe("createBookingController", () => {  
      it("should create booking successfully", async () => {
        jest.spyOn(require("../utils/validation.js"), "validateBooking").mockReturnValue(null);
        req.body = { clientId: "client1", eventId: "event1", seats: ["A1"], price: 100, quantity: 1 };
        const bookingData = { id: "b1", ...req.body };
        jest.spyOn(bookingService, "createBooking").mockResolvedValue(bookingData);
        jest.spyOn(eventService, "updateEventSeats").mockResolvedValue();
        
        await createBookingController(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ success: true, booking: bookingData });
      });
    });
  
    describe("updateBookingById", () => {  
      it("should update booking successfully", async () => {
        req.params.id = "b1";
        req.body = { quantity: 2 };
        const updatedBooking = { id: "b1", quantity: 2 };
        jest.spyOn(bookingService, "updateBooking").mockResolvedValue(updatedBooking);
        
        await updateBookingById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: "Booking updated successfully", event: updatedBooking });
      });
    });
  
    describe("cancelBookingController", () => {  
      it("should cancel booking successfully", async () => {
        req.params.id = "b1";
        const booking = { id: "b1", eventId: "e1", seats: ["A1"], quantity: 1 };
        jest.spyOn(bookingService, "getBookingById").mockResolvedValue(booking);
        jest.spyOn(bookingService, "cancelBooking").mockResolvedValue(booking);
        jest.spyOn(eventService, "updateEventSeats").mockResolvedValue();
        
        await cancelBookingController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, message: "Booking cancelled successfully" });
      });
    });
  
    describe("getUserBookingsController", () => {
      it("should return user bookings", async () => {
        req.params.userId = "client1";
        const bookings = [{ id: "b1" }];
        jest.spyOn(bookingService, "getBookingsByUser").mockResolvedValue(bookings);
        
        await getUserBookingsController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, bookings });
      });
    });
  
    describe("getEventBookingsController", () => {
      it("should return event bookings", async () => {
        req.params.eventId = "e1";
        const bookings = [{ id: "b1" }];
        jest.spyOn(bookingService, "getBookingsByEvent").mockResolvedValue(bookings);
        
        await getEventBookingsController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, bookings });
      });
    });
  
    describe("getEventBookingById", () => {
      it("should return booking by id", async () => {
        req.params.id = "b1";
        const booking = { id: "b1" };
        jest.spyOn(bookingService, "getBookingById").mockResolvedValue(booking);
        
        await getEventBookingById(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true, bookings: booking });
      });
    });
  });
  