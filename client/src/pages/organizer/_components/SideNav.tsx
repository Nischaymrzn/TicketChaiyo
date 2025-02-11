"use client"

import type React from "react"
import { useState } from "react"
import { CalendarDays, PieChart, LayoutDashboard, Settings, Users, Menu, X } from "lucide-react"
import { NavItem } from "../../../components/ui/NavItem"
import ticketImg from "@/assets/ticket.png"

const SideNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 rounded-md bg-gray-800 p-2 text-white md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={20} /> : <Menu size={20}/>}
      </button>

      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar} />}

      <nav
        className={`fixed top-0 left-0 z-50 flex h-screen w-72 flex-col bg-[#1C1C24] p-4 text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 pb-6 mt-1">
          <img src={ticketImg || "/placeholder.svg"} alt="Ticket Chaiyo Logo" className="w-9 h-9" />
          <h1 className="text-2xl font-semibold">Ticket Chaiyo</h1>
        </div>

        <div className="flex flex-1 flex-col gap-4 pr-4 mt-8">
          <NavItem icon={LayoutDashboard} label="Dashboard" href="/organizer/dashboard" />
          <NavItem icon={CalendarDays} label="Events" href="/organizer/events" />
          <NavItem icon={PieChart} label="Sales" href="/organizer/sales" />
          <NavItem icon={Users} label="Customers" href="/organizer/customers" />
        </div>

        <NavItem icon={Settings} label="Settings" href="/organizer/settings" />
      </nav>
    </>
  )
}

export default SideNav

