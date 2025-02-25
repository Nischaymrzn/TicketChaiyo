import { fetchAllRequests } from "../services/request.service.js";
import * as userService from "../services/user.service.js";
import * as eventService from "../services/event.service.js";

describe("Request Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchAllRequests", () => {
    it("should return pending requests sorted by timestamp", async () => {
    
      const now = new Date();
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
      const twentySixHoursAgo = new Date(now.getTime() - 26 * 60 * 60 * 1000); // 26 hours ago

      const organizers = [
        {
          id: "u1",
          name: "Organizer One",
          isAccepted: false,
          createdDate: twentySixHoursAgo.toISOString(),
        },
        {
          id: "u2",
          name: "Organizer Two",
          isAccepted: true,
          createdDate: now.toISOString(),
        },
      ];
      const events = [
        {
          id: "e1",
          title: "Event One",
          isAccepted: false,
          createdDate: twoHoursAgo.toISOString(),
          organizerId: "u1",
          type: "CONCERT",
        },
        {
          id: "e2",
          title: "Event Two",
          isAccepted: true,
          createdDate: now.toISOString(),
          organizerId: "u2",
          type: "MOVIE",
        },
      ];

      jest.spyOn(userService, "getAllOrganizers").mockResolvedValue(organizers);
      jest.spyOn(eventService, "getAllEvents").mockResolvedValue(events);

      const result = await fetchAllRequests();

      expect(result).toHaveLength(2);

      expect(result[0]).toMatchObject({
        id: "e1",
        requestType: "event",
        userName: "Organizer One",
        eventName: "Event One",
        description: "has created a new event.",
        hasActions: true,
        type: "CONCERT",
      });
      expect(result[1]).toMatchObject({
        id: "u1",
        requestType: "organizer",
        userName: "Organizer One",
        description: "has requested to become an organizer.",
        hasActions: true,
        type: "organizer",
      });
    });

    it("should throw an error if getAllOrganizers fails", async () => {
      jest.spyOn(userService, "getAllOrganizers").mockRejectedValue(new Error("Error"));
      jest.spyOn(eventService, "getAllEvents").mockResolvedValue([]);
      await expect(fetchAllRequests()).rejects.toThrow("Error");
    });

    it("should throw an error if getAllEvents fails", async () => {
      jest.spyOn(userService, "getAllOrganizers").mockResolvedValue([]);
      jest.spyOn(eventService, "getAllEvents").mockRejectedValue(new Error("Error"));
      await expect(fetchAllRequests()).rejects.toThrow("Error");
    });
  });
});
