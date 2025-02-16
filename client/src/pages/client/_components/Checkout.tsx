import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useNavigate, useParams } from "react-router"

interface CheckoutSidebarProps {
  selectedSeats: string[]
  ticketPriceNormal: number
  ticketPriceVip: number
}

export function CheckoutSidebar({ selectedSeats, ticketPriceNormal, ticketPriceVip }: CheckoutSidebarProps) {
   const {id} = useParams() 

  const navigate = useNavigate()  
  const isVipSeat = (seat: string) => {
    const row = seat.charAt(0)
    return row === "D" || row === "E"
  }

  const vipSeatsCount = selectedSeats.filter(seat => isVipSeat(seat)).length
  const normalSeatsCount = selectedSeats.length - vipSeatsCount

  const normalTotal = normalSeatsCount * ticketPriceNormal
  const vipTotal = vipSeatsCount * ticketPriceVip
  const total = normalTotal + vipTotal

  return (
    <Card className="bg-[#1c1d20] text-gray-100 border-none">
      <CardHeader>
        <CardTitle>Your Selected Seats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-1">
              {selectedSeats.map((seat) => (
                <span 
                  key={seat} 
                  className={`${
                    isVipSeat(seat) 
                      ? "bg-purple-500/20 text-purple-600" 
                      : "bg-blue-500/20 text-blue-400"
                  } px-2 py-1 rounded text-sm`}
                >
                  {seat}
                </span>
              ))}
            </div>
            <span className="text-sm">{selectedSeats.length} Seats</span>
          </div>

          <Separator className="bg-gray-800" />

          <div className="flex justify-between text-sm">
            <span>Normal</span>
            <span>x{normalSeatsCount}</span>
            <span>रु {normalTotal}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span>VIP</span>
            <span className="pl-6">x{vipSeatsCount}</span>
            <span>रु {vipTotal}</span>
          </div>

          <Separator className="bg-gray-800" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{total}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="p-2 bg-[#FFC987] rounded-xl px-4 font-medium transition hover:bg-[#FFB988] w-full text-black"
          disabled={selectedSeats.length === 0}
          onClick={() => navigate(`/event/${id}/checkout`)}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}
