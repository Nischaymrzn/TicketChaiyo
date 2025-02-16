"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CheckoutSidebarProps {
  ticketPriceNormal: number
  ticketPriceVip: number
}

export function ConcertCheckoutSidebar({ ticketPriceNormal, ticketPriceVip }: CheckoutSidebarProps) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [normalTickets, setNormalTickets] = useState(0)
  const [vipTickets, setVipTickets] = useState(0)

  const normalTotal = normalTickets * ticketPriceNormal
  const vipTotal = vipTickets * ticketPriceVip
  const total = normalTotal + vipTotal

  return (
    <Card className="bg-[#1c1d20] text-gray-100 border-none">
      <CardHeader>
        <CardTitle>Your Concert Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Normal Tickets</span>
            <Select
              value={normalTickets.toString()}
              onValueChange={(value) => setNormalTickets(Number.parseInt(value))}
            >
              <SelectTrigger className="w-[100px] border-gray-600">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <span>VIP Tickets</span>
            <Select value={vipTickets.toString()} onValueChange={(value) => setVipTickets(Number.parseInt(value))}>
              <SelectTrigger className="w-[100px] border-gray-600">
                <SelectValue placeholder="0" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="bg-gray-800" />

          <div className="flex justify-between text-sm">
            <span>Normal</span>
            <span>x{normalTickets}</span>
            <span>रु {normalTotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>VIP</span>
            <span className="pl-6">x{vipTickets}</span>
            <span>रु {vipTotal}</span>
          </div>

          <Separator className="bg-gray-800" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>रु {total}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="p-2 bg-[#FFC987] rounded-xl px-4 font-medium transition hover:bg-[#FFB988] w-full text-black"
          disabled={normalTickets === 0 && vipTickets === 0}
          onClick={() => navigate(`/event/${id}/checkout`)}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}

