import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, MapPin, Users, Music, Film, Edit, Trash, MoreVertical, Ticket } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type EventType = "MOVIE" | "CONCERT"

interface Event {
  id: string
  title: string
  type: EventType
  duration: string | null
  genre: string | null
  director: string | null
  cast: string | null
  poster: string | null
  cardImage: string | null
  ticketPriceNormal: string
  ticketPriceVip: string
  date: string | null
  venue: string | null
  artist: string | null
  createdDate: string
  description: string | null
  totalSeats: string[]
  totalTicketsSold: string | null
}

interface Booking {
  id: string
  event: Event
  quantity: number
  price: number
  bookedAt: string
  name: string
  email: string
  country: string
  state: string
  city: string
}

interface BookingCardProps {
  booking: Booking
  onEdit: (booking: Booking) => void
  onDelete: (bookingId: string) => void
}

export const BookingCard = ({ booking, onEdit, onDelete }: BookingCardProps) => {
  const EventIcon = booking.event.type === "MOVIE" ? Film : Music

  const handleEdit = () => {
    onEdit(booking)
  }

  const handleDelete = () => {
    onDelete(booking.id)
  }

  return (
    <Card className="w-full bg-[#1C1C24] border-[#2C2C35] text-gray-200 mb-6 z-0">
      <CardContent className="p-3 z-0">
        <div className="flex space-x-4">
          <div className="w-1/5 sm:max-w-[100px] md:max-w-[150px] sm:aspect-[3/4] relative flex-shrink-0">
            <img
              src={booking.event.cardImage || ""}
              alt={booking.event.title}
              className="rounded-lg w-full h-full object-cover z-0"
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mr-2 mb-1 sm:mb-0">
                    {booking.event.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="bg-[#2C2C35] border-gray-600 text-[#FFC987] mb-1 sm:mb-0 text-[11px] sm:text-[12px]"
                  >
                    <EventIcon className="w-3 h-3 md:h-4 mr-1" />
                    {booking.event.type}
                  </Badge>
                </div>
                <DropdownMenu className="z-40">
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px] bg-[#1C1C24] border-[#2C2C35] text-gray-200">
                    <DropdownMenuItem onClick={handleEdit} className="cursor-pointer hover:bg-[#2C2C35]">
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} className="cursor-pointer hover:bg-[#2C2C35]">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-400 mb-2">
                {booking.event.date && (
                  <div className="flex items-center mr-4 mb-1 sm:mb-0">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{new Date(booking.event.date).toLocaleDateString()}</span>
                  </div>
                )}
                {booking.event.duration && (
                  <div className="flex items-center mr-4 mb-1 sm:mb-0">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{booking.event.duration}</span>
                  </div>
                )}
                {booking.event.venue && (
                  <div className="flex items-center mb-1 sm:mb-0">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{booking.event.venue}</span>
                  </div>
                )}
              </div>
              {booking.event.type === "MOVIE" && (booking.event.director || booking.event.cast) && (
                <div className="hidden sm:block text-sm text-gray-400 mb-2">
                  {booking.event.director && <span>Director: {booking.event.director}</span>}
                  {booking.event.director && booking.event.cast && <span className="mx-2">|</span>}
                  {booking.event.cast && <span>Cast: {booking.event.cast}</span>}
                </div>
              )}
              {booking.event.type === "CONCERT" && booking.event.artist && (
                <div className="hidden sm:block text-sm sm:text-base text-gray-400 mb-2">
                  Artist: {booking.event.artist}
                </div>
              )}
            </div>
            <div>
              <Separator className="my-2 sm:my-3 bg-[#2C2C35]" />
              <div className="flex justify-between items-center pt-1">
                <div className="text-sm sm:text-base flex items-center gap-2">
                  <span>
                    <Ticket className="w-5 h-5 text-gray-400 mr-1" />
                  </span>
                  <p>
                    <span className="text-gray-400">Quantity: </span>
                    <span className="text-[#FFC987]"> {booking.quantity}</span>
                  </p>
                  <p>
                    <span className="text-gray-400">Amound Paid: </span>
                    <span className="text-[#FFC987]"> {booking.price}</span>
                  </p>
                </div>
                <div className="flex items-center text-sm sm:text-base mr-2">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{booking.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

