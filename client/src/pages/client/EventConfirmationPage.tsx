import { useNavigate, useParams } from "react-router-dom"
import { Facebook, Instagram, Linkedin, Ticket, TicketCheck, Twitter, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetBooking } from "@/hooks/useBookings"
import Tick from "@/assets/Icon.png"
import ClientNav from "./_components/ClientNav"
import { useGetEvent } from "@/hooks/useEvent"
import { format, parseISO } from "date-fns"
import { Calendar } from "react-feather"
import { ArrowLeft } from "lucide-react" 

export default function EventConfirmationPage() {
  const navigate = useNavigate()
  const {id} = useParams()
  const { data, isLoading } = useGetBooking(id as string)
  const booking = data?.bookings ?? {}
  const eventId = booking?.eventId
  const { data : event } = useGetEvent(eventId)
  const eventData = event?.event ?? {}

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleViewTicket = () => {
    window.open(`/event/${eventId}/bookingConfirmed/${id}/invoice`)
  }

  return (
    <div className="bg-[#13131A] min-h-[100vh] text-gray-100 flex flex-col gap-8 overflow-hidden pb-8">
      <ClientNav />
      <div className="pl-16">
        <ArrowLeft  className="w-12 cursor-pointer" onClick={(()=> navigate("/home"))}/>
      </div>
    <div className="flex flex-col items-center justify-center mt-6 bg-[#13131A] text-white p-6">
        
      <div className="w-full max-w-xl bg-[#1C1C24] rounded-lg p-8">
       
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-[#2A2A33] flex items-center justify-center">
            <img src={Tick} alt="" width={60} height={60} />
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-center mb-2">Booking Confirmed</h1>
        <p className="text-gray-400 text-center mb-6">
          We are pleased to inform you that your reservation request has been received and confirmed.
        </p>

        <div className="flex justify-center items-center gap-4 mb-8">
          <span className="text-gray-400">Share on:</span>
          <div className="p-1 border rounded-full bg-gray-800 border-gray-700">
            <Facebook className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <div className="p-1 border rounded-full bg-gray-800 border-gray-700">
          <Instagram className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <div className="p-1 border rounded-full bg-gray-800 border-gray-700">
          <Linkedin className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <div className="p-1 border rounded-full bg-gray-800 border-gray-700">
          <Twitter className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>

        <div className="bg-[#23232D] rounded-lg p-4 mb-6">
          <div className="flex gap-4">
            <img
              src={eventData?.cardImage}
              alt={booking?.eventTitle}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">{eventData?.title}</h2>
              <p className="text-gray-400 text-sm mb-2 flex items-center gap-2"><span><Calendar className="w-4"/></span>{eventData?.date ? format(parseISO(eventData.date), 'yyyy-MM-dd') : "0000:00:00"}</p>
              <p className="text-gray-400 mb-1 flex items-center gap-2"><span><User className="w-4"/></span>{booking?.name}</p>
              <div className="flex justify-between items-center">
                <p className="text-gray-400 flex items-center gap-2"><span><Ticket className="text-red-500 w-4"/></span>{booking?.quantity}x Tickets</p>
                <span className="text-gray-400">Total: {booking?.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
        <Button className="p-2 w-full text-black bg-[#FFC987] rounded-lg px-4 font-medium transition hover:bg-[#FFB988]" onClick={handleViewTicket}>
            <span><TicketCheck className=""/></span>
            View Ticket
          </Button>
        </div>
      </div>
    </div>
    </div>
  )
}

