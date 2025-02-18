import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { getAllEvents } from "./event.service.js";

const prisma = new PrismaClient();

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
  const last4Months = {};
  const last6Months = {};

  for (let i = 0; i < 6; i++) {
    const monthKey = dayjs().subtract(i, "month").format("YYYY-MM");
    if (i < 4) {
        last4Months[monthKey] = 0; 
    }
    last6Months[monthKey] = 0; 
  }

  events.forEach((event) => {
    event.bookings.forEach((booking) => {
      newCustomer.add(booking.clientId);
      totalRevenue += booking.price;
      totalTicketsSold += booking.quantity;

      const bookingMonth = dayjs(booking.createdAt).format("YYYY-MM");
      if (bookingMonth in last4Months) {
        last4Months[bookingMonth] += booking.quantity; 
      }

      const eventMonth = dayjs(event.createdAt).format("YYYY-MM");
      if (eventMonth in last6Months) {
        last6Months[eventMonth] += 1; 
      }
    });

    const type = event.type.toLowerCase();
    eventTypeCounts[type] = (eventTypeCounts[type] || 0) + 1;
  });
  

  const eventDistribution = Object.keys(eventTypeCounts).map((type) => ({
    event: type,
    eventCount: eventTypeCounts[type],
  }));

  

  return {
    dataCards: {
      totalEvents,
      totalCustomers: newCustomer.size,
      totalRevenue,
      totalTicketsSold,
    },
    analytics: {
      totalEventsDistribution: eventDistribution,
      ticketsSoldPerMonth: Object.entries(last4Months).map(([month, count]) => ({
        month,
        ticketsSold: count,
      })),
      eventsCreatedPerMonth: Object.entries(last6Months).map(([month, count]) => ({
        month,
        eventsCreated: count,
      })),
    },
  };
};

export const getOrganizerSalesData = async (organizerId) => {
    const events = await getAllEvents("organizer",organizerId)
    console.log(events)
  
    let totalTicketsSold = 0;
    let totalBookings = 0;
    let totalRevenue = 0;
    const eventTypeTickets = {};
    const last4MonthsBookings = {};
    const last6MonthsRevenue = {};
    const eventBookingCounts = {};
  
    for (let i = 0; i < 6; i++) {
      const monthKey = dayjs().subtract(i, "month").format("MMMM");
      if (i < 4) {
        last4MonthsBookings[monthKey] = { all: 0 };
      }
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

        if (bookingMonth in last6MonthsRevenue) {
          last6MonthsRevenue[bookingMonth] += booking.price;
        }
      });
    });
  
    const totalTicketsSoldChart = Object.entries(eventTypeTickets).map(([event, ticketsSold]) => ({
      event,
      ticketsSold,
    }));
  
    const monthlyBookingsChart = Object.entries(last4MonthsBookings).map(([month, data]) => ({
      month,
      ...data,
    }));
  
    const monthlyRevenueChart = Object.entries(last6MonthsRevenue).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  
    const topBookedEventsChart = Object.entries(eventBookingCounts)
      .sort((a, b) => b[1] - a[1]) 
      .slice(0, 4)
      .map(([event, totalBookings]) => ({ event, totalBookings }));
  
    return {
      dataCards: {
        totalTicketsSold,
        totalBookings,
        totalRevenue,
        totalEvents: events.length,
      },
      analytics: {
        totalTicketsSold: totalTicketsSoldChart,
        monthlyEventBookings: monthlyBookingsChart,
        monthlyEventRevenue: monthlyRevenueChart,
        topBookedEvents: topBookedEventsChart,
      },
    };
  };

  export const getAdminDashboardAnalyticsData = async () => {
    const totalEvents = await prisma.event.count();
    const totalCustomers = await prisma.user.count({ where: { userRole: "client" } });
    const totalOrganizers = await prisma.user.count({ where: { userRole: "organizer" } });
    const totalBookings = await prisma.booking.count();
  
    const totalUserDistribution = [
      { event: "customer", userCount: totalCustomers },
      { event: "organizer", userCount: totalOrganizers },
    ];
  
    const eventBookingCounts = await prisma.booking.groupBy({
      by: ["eventId"],
      _count: { eventId: true },
      orderBy: { _count: { eventId: "desc" } },
      take: 4,
    });
  
    const topBookedEvents = await Promise.all(
      eventBookingCounts.map(async (booking) => {
        const event = await prisma.event.findUnique({ where: { id: booking.eventId } });
        return { event: event?.title || "Unknown Event", totalBookings: booking._count.eventId };
      })
    );
  
    return {
      dataCards: {
        totalEvents,
        totalCustomers,
        totalOrganizers,
        totalBookings,
      },
      analytics: {
        totalUserDistribution,
        topBookedEvents,
      },
    };
  };