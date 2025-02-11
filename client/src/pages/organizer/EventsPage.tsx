import { useState } from "react"
import { PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { EventTypeSelector } from "./_components/EventTypeSelector"
import { MovieForm } from "./_components/MovieForm"
import { ConcertForm } from "./_components/ConcertForm"
import type { MovieFormData, ConcertFormData } from "./_schema"
import authenticatedApi from "@/api"

export const EventsPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [eventType, setEventType] = useState<"MOVIE" | "CONCERT" | null>(null)

  const handleEventTypeSelect = (type: "MOVIE" | "CONCERT") => {
    setEventType(type)
  }

  const handleCreateEvent = async (formData: MovieFormData | ConcertFormData) => {
    console.log(formData);
  
    try {
      const formDataToSend = new FormData();
  
      // Append form data fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "date" && value instanceof Date) {
          formDataToSend.append(key, value.toISOString()); // Convert date to ISO 8601 format
        } else if (value instanceof File) {
          formDataToSend.append(key, value); // Append file fields (e.g., poster, cardImage)
        } else {
          formDataToSend.append(key, String(value)); // Ensure all other fields are strings
        }
      });
  
      formDataToSend.append("type", eventType || "");
  
      // Send the form data to the backend
      const response = await authenticatedApi.post("/events", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        setIsOpen(false);
        setEventType(null);
      } else {
        console.error("Failed to create event", response);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  
  const handleDialogClose = () => {
    setIsOpen(false)
    setEventType(null)
  }

  return (
    <div className="text-gray-300 w-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-sm md:text-base text-gray-400">Monitor all your events here</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FFC987] text-black hover:bg-[#f5d0a2]" onClick={() => setIsOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] bg-[#1C1C24] border-[#1F1F2C] text-white p-0">
            {!eventType ? (
              <EventTypeSelector onSelect={handleEventTypeSelect} />
            ) : eventType === "MOVIE" ? (
              <MovieForm onSubmit={handleCreateEvent} onCancel={handleDialogClose} />
            ) : (
              <ConcertForm onSubmit={handleCreateEvent} onCancel={handleDialogClose} />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Event list rendering code (commented out in the original) */}
    </div>
  )
}
