import { getAllOrganizers } from "./user.service.js";
import { getAllEvents } from "./event.service.js";

export const fetchAllRequests = async () => {
  const users = await getAllOrganizers();
  const events = await getAllEvents();

  const pendingRequests = [];

  users.forEach((user) => {
    if (!user.isAccepted) {
      pendingRequests.push({
        id: user.id,
        requestType: "organizer",
        userName: user.name,
        description: "has requested to become an organizer.",
        timestamp: formatTimestamp(user.createdDate),
        createdAt: new Date(user.createdDate), 
        hasActions: true,
        type: "organizer",
      });
    }
  });

  events.forEach((event) => {
    if (!event.isAccepted) {
      pendingRequests.push({
        id: event.id,
        requestType: "event",
        userName:
          users.find((user) => user.id === event.organizerId)?.name ||
          "Unknown Organizer",
        eventName: event.title,
        description: "has created a new event.",
        timestamp: formatTimestamp(event.createdDate),
        createdAt: new Date(event.createdDate),
        hasActions: true,
        type: event.type,
      });
    }
  });

  const sortedRequests = pendingRequests.sort(
    (a, b) => b.createdAt - a.createdAt
  );

  return sortedRequests.map(({ createdAt, ...rest }) => rest);
};

function formatTimestamp(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

  if (diffInHours < 24) {
    return `${diffInHours} Hour${diffInHours !== 1 ? "s" : ""} Ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} Day${diffInDays !== 1 ? "s" : ""} Ago`;
  }
}
