import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { getAllEvents } from "./event.service.js";

const prisma = new PrismaClient();

const formatEventDistribution = (eventTypeCounts) =>
  Object.entries(eventTypeCounts).map(([type, count]) => ({ event: type, eventCount: count }));

const formatTicketsSoldPerMonth = (events) =>
  Array.from({ length: 4 }, (_, i) => dayjs().subtract(i, 'month').format('MMMM')).reverse().map(month => ({
    month,
    movie: events.filter(e => e.type === 'MOVIE').reduce((sum, e) => sum + e.bookings.filter(b => dayjs(b.bookedAt).format('MMMM') === month).reduce((s, b) => s + b.quantity, 0), 0),
    concert: events.filter(e => e.type === 'CONCERT').reduce((sum, e) => sum + e.bookings.filter(b => dayjs(b.bookedAt).format('MMMM') === month).reduce((s, b) => s + b.quantity, 0), 0)
  }));

const formatEventsCreatedPerMonth = (last6Months) =>
  Object.entries(last6Months).map(([month, count]) => ({ month, eventsCreated: count }));

const formatTopBookedEvents = (eventBookingCounts) =>
  Object.entries(eventBookingCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([event, totalBookings]) => ({ event, totalBookings }));

const formatTotalUserDistribution = (totalCustomers, totalOrganizers) => [
  { event: "customer", userCount: totalCustomers },
  { event: "organizer", userCount: totalOrganizers },
];

export const getOrganizerAnalyticsDashboard = async (organizerId) => {
  const events = await prisma.event.findMany({
    where: { organizerId },
    include: { bookings: true },
  });

  const totalEvents = events.length;
  const newCustomer = new Set();
  let totalRevenue = 0;
  let totalTicketsSold = 0;
  const eventTypeCounts = {};
  const last6Months = {};

  for (let i = 0; i < 6; i++) {
    last6Months[dayjs().subtract(i, "month").format("YYYY-MM")] = 0;
  }

  events.forEach((event) => {
    event.bookings.forEach((booking) => {
      newCustomer.add(booking.clientId);
      totalRevenue += booking.price;
      totalTicketsSold += booking.quantity;
      const eventMonth = dayjs(event.createdAt).format("YYYY-MM");
      if (eventMonth in last6Months) last6Months[eventMonth] += 1;
    });
    const type = event.type.toLowerCase();
    eventTypeCounts[type] = (eventTypeCounts[type] || 0) + 1;
  });

  return {
    totalEvents,
    totalCustomers: newCustomer.size,
    totalRevenue,
    totalTicketsSold,
    totalEventsDistribution: formatEventDistribution(eventTypeCounts),
    ticketsSoldPerMonth: formatTicketsSoldPerMonth(events),
    eventsCreatedPerMonth: formatEventsCreatedPerMonth(last6Months),
  };
};

export const getOrganizerSalesData = async (organizerId) => {
  const events = await getAllEvents("organizer", organizerId);
  let totalTicketsSold = 0, totalBookings = 0, totalRevenue = 0;
  const eventTypeTickets = {}, last4MonthsBookings = {}, last6MonthsRevenue = {}, eventBookingCounts = {};

  for (let i = 0; i < 6; i++) {
    const monthKey = dayjs().subtract(i, "month").format("MMMM");
    if (i < 4) last4MonthsBookings[monthKey] = { all: 0 };
    last6MonthsRevenue[monthKey] = 0;
  }

  events.forEach((event) => {
    event.bookings.forEach((booking) => {
      totalTicketsSold += booking.quantity;
      totalRevenue += booking.price;
      totalBookings += 1;
      eventTypeTickets[event.type] = (eventTypeTickets[event.type] || 0) + booking.quantity;
      eventBookingCounts[event.title] = (eventBookingCounts[event.title] || 0) + 1;
      const bookingMonth = dayjs(booking.createdAt).format("MMMM");
      if (bookingMonth in last4MonthsBookings) {
        last4MonthsBookings[bookingMonth][event.type] = (last4MonthsBookings[bookingMonth][event.type] || 0) + 1;
        last4MonthsBookings[bookingMonth].all += 1;
      }
      if (bookingMonth in last6MonthsRevenue) last6MonthsRevenue[bookingMonth] += booking.price;
    });
  });

  return {
    totalTicketsSold,
    totalBookings,
    totalRevenue,
    totalEvents: events.length,
    totalTicketsSoldChart: formatEventDistribution(eventTypeTickets),
    monthlyEventBookings: Object.entries(last4MonthsBookings).map(([month, data]) => ({ month, ...data })),
    monthlyEventRevenue: Object.entries(last6MonthsRevenue).map(([month, revenue]) => ({ month, revenue })),
    topBookedEvents: formatTopBookedEvents(eventBookingCounts),
  };
};

export const getAdminDashboardAnalyticsData = async () => {
  const [totalEvents, totalCustomers, totalOrganizers, totalBookings, topBookedEvents] = await Promise.all([
    prisma.event.count(),
    prisma.user.count({ where: { userRole: "client" } }),
    prisma.user.count({ where: { userRole: "organizer" } }),
    prisma.booking.count(),
    prisma.booking.groupBy({
      by: ["eventId"],
      _count: { eventId: true },
      orderBy: { _count: { eventId: "desc" } },
      take: 4,
    }).then((results) =>
      Promise.all(
        results.map(async ({ eventId, _count }) => ({
          event: (await prisma.event.findUnique({ where: { id: eventId } }))?.title || "Unknown Event",
          totalBookings: _count.eventId,
        }))
      )
    ),
  ]);

  return {
    totalEvents,
    totalCustomers,
    totalOrganizers,
    totalBookings,
    totalUserDistribution: formatTotalUserDistribution(totalCustomers, totalOrganizers),
    topBookedEvents,
  };
};
