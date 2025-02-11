import { useState } from "react"
import { ShipWheelIcon as Wheelchair } from "lucide-react"

interface SeatSelectionProps {
  totalRows: number
  seatsPerRow: number
  totalSeatsBooked: string[]
  onSeatSelect: (seat: string) => void
}

const SeatSelection = ({ totalRows, seatsPerRow, totalSeatsBooked, onSeatSelect } : SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])

  const handleSeatClick = (seat: string) => {
    if (totalSeatsBooked.includes(seat.toLowerCase())) return

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat)
      } else {
        return [...prev, seat]
      }
    })
    onSeatSelect(seat)
  }

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat")
      return
    }
    console.log("Booking seats:", selectedSeats)
    // Add your booking logic here
  }

  const renderSeats = () => {
    const rows = []
    for (let i = 0; i < totalRows; i++) {
      const rowLetter = String.fromCharCode(65 + i)
      const seats = []

      // Add row label at the start
      seats.push(
        <div key={`label-start-${rowLetter}`} className="w-6 text-gray-400 text-sm flex items-center">
          {rowLetter}
        </div>,
      )

      // Add seats with proper grouping
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatNumber = `${rowLetter}${j}`
        const isBooked = totalSeatsBooked.includes(seatNumber.toLowerCase())
        const isSelected = selectedSeats.includes(seatNumber)
        const isAccessible = (rowLetter === "D" && j === 5) || (rowLetter === "G" && j === 2)

        // Add gap for aisle
        if (j === Math.floor(seatsPerRow / 3) || j === Math.floor((2 * seatsPerRow) / 3)) {
          seats.push(<div key={`gap-${rowLetter}-${j}`} className="w-8" />)
        }

        seats.push(
          <button
            key={seatNumber}
            className={`w-7 h-7 m-0.5 rounded-md flex items-center justify-center text-xs transition-all ${
              isBooked
                ? "bg-gray-700 cursor-not-allowed"
                : isSelected
                  ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                  : "bg-gray-600 hover:bg-gray-500"
            }`}
            onClick={() => handleSeatClick(seatNumber)}
            disabled={isBooked}
            title={`Seat ${seatNumber}`}
          >
            {isAccessible ? <Wheelchair className="w-4 h-4 text-gray-300" /> : null}
          </button>,
        )
      }

      // Add row label at the end
      seats.push(
        <div key={`label-end-${rowLetter}`} className="w-6 text-gray-400 text-sm flex items-center">
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
    <div className="max-w-5xl mx-auto p-8 bg-[#1c1c24] rounded-lg">
      {/* Curved screen text */}
      <div className="relative mb-16 text-center">
        <div className="absolute inset-x-0 top-0 h-[120px] overflow-hidden">
          <div
            className="w-full h-[200px] rounded-[100%] border-t-2 border-blue-500/30"
            style={{ transform: "translateY(-120px)" }}
          />
        </div>
        <span className="relative text-blue-400 text-sm tracking-[0.2em]">SCREEN</span>
      </div>

      {/* Seats container */}
      <div className="space-y-2 mb-12">{renderSeats()}</div>

      {/* Booking Button */}
      <div className="flex justify-center">
        <button
          onClick={handleBooking}
          className={`px-8 py-3 rounded-md text-sm font-semibold transition-all
            ${
              selectedSeats.length > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
        >
          {selectedSeats.length > 0
            ? `Book ${selectedSeats.length} Seat${selectedSeats.length > 1 ? "s" : ""}`
            : "Select seats to book"}
        </button>
      </div>
    </div>
  )
}

export default SeatSelection

