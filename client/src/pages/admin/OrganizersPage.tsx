"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDeleteUser, useGetOrganizers, useUpdateUser } from "@/hooks/useUser"
import { OrganizerDataTable } from "./_components/OrganizerDataTable"
import { MoreVertical } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EditOrganizerModal } from "./_components/EditOrganizerModal"
import { AddOrganizerModal } from "./_components/AddOrganizerModal"

export const OrganizersPage = () => {
  const { data: organizers } = useGetOrganizers()
  const organizerData = organizers?.users ?? []
  const [editingOrganizer, setEditingOrganizer] = useState<any | null>(null)

  const handleEdit = (organizer: any) => {
    setEditingOrganizer(organizer)
  }

  const deleteUser = useDeleteUser()

  const handleRemove = async (organizerId: string) => {
    try{
      await deleteUser.mutateAsync(organizerId)
    }catch(error){
      console.log(error)
    }
  }

  const updateUser = useUpdateUser()

  const handleSave = async (userId : string ,userData: any) => {
    setEditingOrganizer(null)
    try {
      const response = await updateUser.mutateAsync({ userId, userData })
      console.log(response)
    }catch (error){
      console.log(error)
    }
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Organizer",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-[#2e2e3a]">
            <AvatarFallback className="text-black">{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-white font-medium">{row.original.name}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }: { row: any }) => (
        <div className="flex flex-col">
          <span className="text-white font-medium">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }: { row: any }) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">{row.original.username}</span>
        </div>
      ),
    },
    {
      accessorKey: "totalEvents",
      header: "Total Events",
      cell: ({ row }: { row: any }) => (
        <div className="flex flex-col">
          <span className="text-white text-base">{row.original.Event.length}</span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }: { row: any }) => {
        const organizer = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1c1c24] border-[#2e2e3a]">
              <DropdownMenuItem onClick={() => handleEdit(organizer)} className="text-white hover:bg-[#24242c]">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRemove(organizer.id)} className="text-white hover:bg-[#24242c]">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Organizers</h2>
          <p className="text-gray-400">Manage your system event organizers</p>
        </div>
        <AddOrganizerModal />
      </div>
      <OrganizerDataTable columns={columns} data={organizerData} />
      {editingOrganizer && (
        <EditOrganizerModal
          organizer={editingOrganizer}
          onClose={() => setEditingOrganizer(null)}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
