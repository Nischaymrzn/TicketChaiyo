import { useState, useEffect } from "react"
import { useParams } from "react-router"
import ClientNav from "./_components/ClientNav"
import { MovieDetailsCard } from "./_components/MovieDetailsCard"
import { useGetEvent } from "@/hooks/useEvent"
import { ConcertDetailsCard } from "./_components/ConcertDetailCard"
import SeatSelection from "./_components/SeatSelection"
import { CheckoutSidebar } from "./_components/Checkout"
import { ConcertCheckoutSidebar } from "./_components/ConcertCheckout"
import { useCheckout } from "@/state-stores/CheckoutContext"

export const EventDetailPage = () => {
  const { id } = useParams()
  const { data } = useGetEvent(id as string)
  const eventData = data?.event ?? {}
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const { setCheckoutData } = useCheckout()

  useEffect(() => {
    setCheckoutData({
      eventType: eventData.type,
      eventId: id as string,
      totalAmount: 0,
    })
  }, [id, eventData.type, setCheckoutData])

  const handleSeatSelect = (seat: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat)
      } else {
        return [...prev, seat]
      }
    })
  }

  return (
    <div className="bg-[#13131A] min-h-[100vh] text-gray-100 flex flex-col gap-8 overflow-hidden pb-8">
      <ClientNav />
      <div className="px-6 xs:px-16 sm:px-6 ml:px-14 2xl:px-16">
        {eventData.type === "CONCERT" && <ConcertDetailsCard {...eventData} />}
        {eventData.type === "MOVIE" && <MovieDetailsCard {...eventData} />}
      </div>

      <div className="px-6 xs:px-16 sm:px-6 ml:px-14 2xl:px-16">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-grow">
            {eventData.totalSeats && eventData.type === "MOVIE" && (
              <SeatSelection
                totalSeats={eventData.totalSeats}
                onSeatSelect={handleSeatSelect}
                ticketPriceNormal={eventData.ticketPriceNormal}
                ticketPriceVip={eventData.ticketPriceVip}
              />
            )}
            {eventData.type === "CONCERT" && (
              <img src={eventData.poster || "/placeholder.svg"} alt="Concert poster" className="2xl:w-[1200px]" />
            )}
          </div>
          <div className="lg:w-[550px]">
            {eventData.type === "MOVIE" && (
              <CheckoutSidebar
                selectedSeats={selectedSeats}
                ticketPriceNormal={eventData.ticketPriceNormal}
                ticketPriceVip={eventData.ticketPriceVip}
              />
            )}

            {eventData.totalSeats && eventData.type === "CONCERT" && (
              <ConcertCheckoutSidebar
                ticketPriceNormal={eventData.ticketPriceNormal}
                ticketPriceVip={eventData.ticketPriceVip}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

