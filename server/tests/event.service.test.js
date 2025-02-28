jest.mock("@prisma/client", () => {
    const eventMock = {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    const PrismaClient = jest.fn().mockImplementation(() => ({
      event: eventMock,
    }));
    return { PrismaClient };
  });
  
  import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, updateEventSeats } from "../services/event.service.js";
  
  const { PrismaClient } = require("@prisma/client");
  const eventMock = new PrismaClient().event;
  
  describe("Event Service", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe("createEvent", () => {
      it("should create an event", async () => {
        const eventData = { title: "Test Event" };
        eventMock.create.mockResolvedValue({ id: "e1", ...eventData });
        const result = await createEvent(eventData);
        expect(eventMock.create).toHaveBeenCalledWith({ data: eventData });
        expect(result).toEqual({ id: "e1", ...eventData });
      });
    });
  
    describe("getAllEvents", () => {
      it("should return events for organizer", async () => {
        const events = [{ id: "e1", organizerId: "org1" }];
        eventMock.findMany.mockResolvedValue(events);
        const result = await getAllEvents("organizer", "org1");
        expect(eventMock.findMany).toHaveBeenCalledWith({
          where: { organizerId: "org1" },
          include: { bookings: { include: { client: true } } },
        });
        expect(result).toEqual(events);
      });
  
      it("should return all events for non-organizer", async () => {
        const events = [{ id: "e2" }];
        eventMock.findMany.mockResolvedValue(events);
        const result = await getAllEvents("client", "anyId");
        expect(eventMock.findMany).toHaveBeenCalledWith({ include: { bookings: true } });
        expect(result).toEqual(events);
      });
    });
  
    describe("getEventById", () => {
      it("should return an event by id", async () => {
        const eventData = { id: "e1", title: "Test Event" };
        eventMock.findUnique.mockResolvedValue(eventData);
        const result = await getEventById("e1");
        expect(eventMock.findUnique).toHaveBeenCalledWith({ where: { id: "e1" } });
        expect(result).toEqual(eventData);
      });
    });
  
    describe("updateEvent", () => {
      it("should update an event", async () => {
        const eventData = { title: "Updated Event" };
        eventMock.update.mockResolvedValue({ id: "e1", ...eventData });
        const result = await updateEvent("e1", eventData);
        expect(eventMock.update).toHaveBeenCalledWith({ where: { id: "e1" }, data: eventData });
        expect(result).toEqual({ id: "e1", ...eventData });
      });
    });
  
    describe("deleteEvent", () => {
      it("should delete an event", async () => {
        eventMock.delete.mockResolvedValue({ id: "e1" });
        const result = await deleteEvent("e1");
        expect(eventMock.delete).toHaveBeenCalledWith({ where: { id: "e1" } });
        expect(result).toEqual({ id: "e1" });
      });
    });
  });
  