"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAcceptEvent, useAcceptUser, useGetRequests } from "@/hooks/useRequests"
import { useDeleteEvent } from "@/hooks/useEvent"
import { useDeleteUser } from "@/hooks/useUser"

interface Activity {
  id: string
  requestType: "organizer" | "event"
  userName: string
  description: string
  timestamp: string
  hasActions: boolean
  eventName?: string
  type?: "organizer" | "MOVIE" | "CONCERT"
}

const RequestsPage = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const { data, isLoading } = useGetRequests()

  const rejectEvent = useDeleteEvent()
  const rejectUser = useDeleteUser()
  const acceptUser = useAcceptUser()
  const acceptEvent = useAcceptEvent()

  useEffect(() => {
    if (data?.requests) {
      setActivities(data.requests)
    }
  }, [data])

  const handleAccept = async (eventId: string, requestType: string) => {
    if (requestType === "event") {
      await acceptEvent.mutateAsync({ eventId, eventData: { isAccepted: true } })
    } else if (requestType === "organizer") {
      await acceptUser.mutateAsync({ userId: eventId, userData: { isAccepted: true } })
    }
    // Optionally, you can refetch the requests or update the local state here
  }

  const handleReject = async (id: string, requestType: "event" | "organizer") => {
    if (requestType === "event") {
      await rejectEvent.mutateAsync(id)
    } else if (requestType === "organizer") {
      await rejectUser.mutateAsync(id)
    }
    // Optionally, you can refetch the requests or update the local state here
  }

  return (
    <div className="text-gray-300 w-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-white">Requests</h1>
        <p className="text-sm md:text-base px-1">Monitor all event requests here</p>
      </div>

      <Card className="bg-[#1c1c24] border-0 mt-12 pt-8">
        <CardContent className="space-y-4">
          {isLoading ? (
            <p className="text-white">Loading requests...</p>
          ) : activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={activity.id} className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-red-500" />
                    <div className="space-y-2">
                      <h3 className="text-white font-medium">
                        {activity.requestType === "organizer" ? "Organizer Request" : "New Event Created"}
                      </h3>
                      <p className="text-gray-400 text-base">
                        <span className="text-gray-300">{activity.userName}</span> {activity.description}
                        {activity.eventName && <span className="text-gray-300"> Event name: {activity.eventName}</span>}
                      </p>
                      {activity.hasActions && (
                        <div className="flex gap-3 mt-3">
                          <Button
                            size="sm"
                            className="bg-[#FFC987] text-black hover:bg-[#f5d0a2] px-4 text-sm"
                            onClick={() => handleAccept(activity.id, activity.requestType)}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-transparent text-white hover:border-red-500 hover:bg-transparent hover:text-white border-[#FFC987] px-4 text-sm"
                            onClick={() => handleReject(activity.id, activity.requestType)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-base text-gray-500">{activity.timestamp}</span>
                </div>
                {index < activities.length - 1 && <Separator className="mt-6 bg-gray-800" />}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-white text-lg">No requests available</p>
              <p className="text-gray-400 mt-2">New requests will appear here when they are received.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RequestsPage

