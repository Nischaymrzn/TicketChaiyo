jest.mock("@prisma/client", () => {
    const bookingMock = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    };
    const PrismaClient = jest.fn().mockImplementation(() => ({
      booking: bookingMock,
    }));
    return { PrismaClient };
  });
  
  import {
    createBooking,
    updateBooking,
    cancelBooking,
    getBookingById
  } from "../services/booking.service.js";
  
  const { PrismaClient } = require("@prisma/client");
  const bookingMock = new PrismaClient().booking;
  
  describe("Booking Service", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe("createBooking", () => {
      it("should create a booking", async () => {
        const bookingData = {
          clientId: "client1",
          eventId: "event1",
          seats: ["A1"],
          price: 100,
          quantity: 1,
        };
        const createdBooking = { id: "b1", ...bookingData };
        bookingMock.create.mockResolvedValue(createdBooking);
        
        const result = await createBooking(bookingData);
        expect(bookingMock.create).toHaveBeenCalledWith({ data: bookingData });
        expect(result).toEqual(createdBooking);
      });
    });
  
    describe("updateBooking", () => {
      it("should update a booking", async () => {
        const bookingData = { quantity: 2 };
        const updatedBooking = { id: "b1", ...bookingData };
        bookingMock.update.mockResolvedValue(updatedBooking);
        
        const result = await updateBooking("b1", bookingData);
        expect(bookingMock.update).toHaveBeenCalledWith({
          where: { id: "b1" },
          data: bookingData,
        });
        expect(result).toEqual(updatedBooking);
      });
    });
  
    describe("cancelBooking", () => {
      it("should cancel a booking", async () => {
        const deletedBooking = { id: "b1" };
        bookingMock.delete.mockResolvedValue(deletedBooking);
        
        const result = await cancelBooking("b1");
        expect(bookingMock.delete).toHaveBeenCalledWith({ where: { id: "b1" } });
        expect(result).toEqual(deletedBooking);
      });
    });
  
    describe("getBookingById", () => {
      it("should return a booking by id", async () => {
        const bookingData = { id: "b1" };
        bookingMock.findUnique.mockResolvedValue(bookingData);
        
        const result = await getBookingById("b1");
        expect(bookingMock.findUnique).toHaveBeenCalledWith({ where: { id: "b1" } });
        expect(result).toEqual(bookingData);
      });
    });
  });
  