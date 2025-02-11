import type React from "react"
import SeatSelection from "./SeatSelection"

const MovieBooking: React.FC = () => {
  const handleSeatSelect = (seat: string) => {
    console.log(`Seat ${seat} selected`)
  }

  const totalSeatsBooked = ["a1", "a2", "a3", "d5", "d6", "d7"]

  return (
    <div className="min-h-screen bg-[#1c1c24] py-8">
      <div className="container mx-auto px-4">
        <SeatSelection
          totalRows={10}
          seatsPerRow={15}
          totalSeatsBooked={totalSeatsBooked}
          onSeatSelect={handleSeatSelect}
        />
      </div>
    </div>
  )
}

export default MovieBooking

