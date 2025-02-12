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

interface EventCardProps {
  event: Event
  onEdit: (event: Event) => void
  onDelete: (eventId: string) => void
}

export const EventCard = ({ event, onEdit, onDelete } : EventCardProps) => {
  const EventIcon = event.type === "MOVIE" ? Film : Music

  const handleEdit = () => {
    onEdit(event)
  }

  const handleDelete = () => {
    onDelete(event.id)
  }

  return (
    <Card className="w-full bg-[#1C1C24] border-[#2C2C35] text-gray-200 mb-6 z-0">
      <CardContent className="p-3 z-0">
        <div className="flex space-x-4">
          <div className="w-1/5 sm:max-w-[100px] md:max-w-[150px] sm:aspect-[3/4] relative flex-shrink-0">
            <img
              src={event.cardImage || "/placeholder.svg"}
              alt={event.title}
              className="rounded-lg w-full h-full object-cover z-0"
            />
          </div>
          <div className="flex-grow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mr-2 mb-1 sm:mb-0">{event.title}</h3>
                  <Badge
                    variant="outline"
                    className="bg-[#2C2C35] border-gray-600 text-[#FFC987] mb-1 sm:mb-0 text-[11px] sm:text-[12px]"
                  >
                    <EventIcon className="w-3 h-3 md:h-4 mr-1" />
                    {event.type}
                  </Badge>
                </div>
                <DropdownMenu>
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
                {event.date && (
                  <div className="flex items-center mr-4 mb-1 sm:mb-0">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                )}
                {event.duration && (
                  <div className="flex items-center mr-4 mb-1 sm:mb-0">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{event.duration}</span>
                  </div>
                )}
                {event.venue && (
                  <div className="flex items-center mb-1 sm:mb-0">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{event.venue}</span>
                  </div>
                )}
              </div>
              {event.type === "MOVIE" && (event.director || event.cast) && (
                <div className="hidden sm:block text-sm text-gray-400 mb-2">
                  {event.director && <span>Director: {event.director}</span>}
                  {event.director && event.cast && <span className="mx-2">|</span>}
                  {event.cast && <span>Cast: {event.cast}</span>}
                </div>
              )}
              {event.type === "CONCERT" && event.artist && (
                <div className="hidden sm:block text-sm sm:text-base text-gray-400 mb-2">Artist: {event.artist}</div>
              )}
            </div>
            <div>
              <Separator className="my-2 sm:my-3 bg-[#2C2C35]" />
              <div className="flex justify-between items-center pt-1">
                <div className="text-sm sm:text-base flex items-center gap-2">
                  <span>
                    <Ticket className="w-6 h-6 text-gray-400 mr-1" />
                  </span>
                  <p>
                    <span className="text-gray-400">General: </span>
                    <span className="text-[#FFC987]"> {event.ticketPriceNormal}</span>
                  </p>
                  <p className="hidden md:inline ml-1">
                    <span className="text-gray-400">VIP: </span>
                    <span className="text-[#FFC987]"> {event.ticketPriceVip}</span>
                  </p>
                </div>
                <div className="flex items-center text-sm sm:text-base mr-2">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  {event?.totalTicketsSold !== null ? (
                    <span>{event?.totalTicketsSold} Sold</span>
                  ) : (
                    <span>No sales data</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

