import { useState, useEffect } from "react"
import { Square } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useCheckout } from "@/state-stores/CheckoutContext"

interface SeatSelectionProps {
  totalSeats: string[]
  onSeatSelect: (seat: string) => void
  ticketPriceNormal: number
  ticketPriceVip: number
}

const SeatSelection = ({ totalSeats, onSeatSelect, ticketPriceNormal, ticketPriceVip }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const { setCheckoutData } = useCheckout()

  const handleSeatClick = (seat: string) => {
    if (totalSeats.includes(seat.toLowerCase())) return

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat)
      } else {
        return [...prev, seat]
      }
    })
    onSeatSelect(seat)
  }

  useEffect(() => {
    const normalSeatsCount = selectedSeats.filter((seat) => !isVipRow(seat[0])).length
    const vipSeatsCount = selectedSeats.length - normalSeatsCount
    const totalAmount = normalSeatsCount * ticketPriceNormal + vipSeatsCount * ticketPriceVip

    setCheckoutData((prev) => ({
      ...prev,
      normalTickets : normalSeatsCount,
      vipTickets : vipSeatsCount,
      selectedSeats,
      totalAmount,
    }))
  }, [selectedSeats, ticketPriceNormal, ticketPriceVip, setCheckoutData])

  const isVipRow = (rowLetter: string) => {
    return rowLetter === "D" || rowLetter === "E"
  }

  const renderSeats = () => {
    const totalRows = 8
    const seatsPerRow = 12

    const rows = []
    for (let i = 0; i < totalRows; i++) {
      const rowLetter = String.fromCharCode(65 + i)
      const seats = []

      seats.push(
        <div key={`label-start-${rowLetter}`} className="w-8 text-gray-400 text-sm flex items-center justify-center">
          {rowLetter}
        </div>,
      )

      for (let j = 1; j <= seatsPerRow; j++) {
        const seatNumber = `${rowLetter}${j}`
        const isBooked = totalSeats.includes(seatNumber.toLowerCase()) || totalSeats.includes(seatNumber.toUpperCase())
        const isSelected = selectedSeats.includes(seatNumber)
        const isVip = isVipRow(rowLetter)

        if (j === Math.floor(seatsPerRow / 3) || j === Math.floor((2 * seatsPerRow) / 3)) {
          seats.push(<div key={`gap-${rowLetter}-${j}`} className="w-8" />)
        }

        seats.push(
          <button
            key={seatNumber}
            className={`w-9 h-9 m-1 mx-2 rounded-md flex items-center justify-center text-xs transition-all ${
              isBooked
                ? "bg-gray-800 cursor-not-allowed"
                : isSelected
                  ? isVip
                    ? "bg-purple-500 shadow-lg shadow-purple-500/50"
                    : "bg-blue-500 shadow-lg shadow-blue-500/50"
                  : isVip
                    ? "bg-purple-600/40 hover:bg-purple-900/70"
                    : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => handleSeatClick(seatNumber)}
            disabled={isBooked}
            title={`Seat ${seatNumber}${isVip ? " (VIP)" : ""}`}
          >
            {seatNumber}
          </button>,
        )
      }

      seats.push(
        <div key={`label-end-${rowLetter}`} className="w-8 text-gray-400 text-sm flex items-center justify-center">
          {rowLetter}
        </div>,
      )

      rows.push(
        <div key={rowLetter} className="flex justify-center items-center">
          {seats}
        </div>,
      )
    }
    return rows
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-[#1c1d20] rounded-lg">
  
      <div className="flex items-center justify-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <Square className="w-4 h-4 fill-gray-600" />
          <span className="text-sm text-gray-400">Normal (रु {ticketPriceNormal})</span>
        </div>
        <div className="flex items-center gap-2">
          <Square className="w-4 h-4 fill-purple-600/40" />
          <span className="text-sm text-gray-400">VIP (रु {ticketPriceVip})</span>
        </div>
        <div className="flex items-center gap-2">
          <Square className="w-4 h-4 fill-gray-800" />
          <span className="text-sm text-gray-400">Booked</span>
        </div>
      </div>

      <ScrollArea className="rounded-lg w-full whitespace-nowrap shrink-0">
        <div className="relative mb-16 text-center">
          <div className="absolute inset-x-0 top-0 h-[120px] overflow-hidden">
            <div
              className="w-full h-[200px] rounded-[100%] border-t-2 border-blue-500/30"
              style={{ transform: "translateY(-120px)" }}
            />
          </div>
          <span className="relative text-blue-400 text-sm tracking-[0.2em]">SCREEN</span>
        </div>

        <div className="space-y-2 mb-12 overflow-x-auto">
          <div className="inline-block min-w-full">{renderSeats()}</div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default SeatSelection

