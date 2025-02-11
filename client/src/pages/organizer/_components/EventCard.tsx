import { CalendarDays, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EventCardProps {
  title: string
  location: string
  startDate: string
  totalTickets: number
  soldTickets: number
  status: "active" | "completed" | "cancelled"
  imageUrl: string
  onEdit?: () => void
  onDelete?: () => void
  onPreview?: () => void
}

export const EventCard = ({
  title,
  location,
  startDate,
  totalTickets,
  soldTickets,
  status,
  imageUrl,
  onEdit,
  onDelete,
  onPreview,
} : EventCardProps) => {
  const statusColors = {
    active: "bg-green-500",
    completed: "bg-gray-500",
    cancelled: "bg-red-500",
  }

  return (
    <Card className="bg-[#1C1C24] border-[#2E2E3A] text-gray-100">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <img src={imageUrl || "/placeholder.svg"} alt={title} className="h-24 w-36 rounded-lg object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <Badge className={`${statusColors[status]} text-white`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-gray-400">{location}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 text-gray-100 border-gray-700">
              <DropdownMenuItem onClick={onPreview} className="gap-2">
                <Eye className="h-4 w-4" />
                <span>Preview Event</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit} className="gap-2">
                <Pencil className="h-4 w-4" />
                <span>Edit Event</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="gap-2 text-red-400">
                <Trash2 className="h-4 w-4" />
                <span>Delete Event</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Starts on</p>
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-gray-400" />
              <p className="text-sm">{startDate}</p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Ticket</p>
            <p className="text-sm">{totalTickets}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Tickets Sold</p>
            <p className="text-sm">{soldTickets}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

