import {  useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDeleteUser, useGetCustomers, useUpdateUser } from "@/hooks/useUser"
import { CustomerDataTable } from "./_components/CustomerDataTable"
import { MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { EditUserModal } from "./_components/EditUserModal"

export const AdminCustomersPage = () => {
  const { data } = useGetCustomers()
  const customers = data?.users ?? []
  const [editingUser, setEditingUser] = useState<any | null>(null)

  const handleEdit = (user: any) => {
    setEditingUser(user)
  }

  const deleteUser = useDeleteUser()

  const handleRemove = async (userId: string) => {
    try{
      await deleteUser.mutateAsync(userId)
    }catch(error){
      console.log(error)
    }
  }

  const updateUser = useUpdateUser()

  const handleSave = async (userId : string ,userData: any) => {
    setEditingUser(null)
    try {
      await updateUser.mutateAsync({ userId, userData })
    }catch (error){
      console.log(error)
    }
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row } : {row : any}) => (
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
      cell: ({ row } : {row : any}) => (
        <div className="flex flex-col">
          <span className="text-white font-medium">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row } : {row : any}) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-400">{row.original.username}</span>
        </div>
      ),
    },
    {
      accessorKey: "totalBookings",
      header: "Total Booking",
      cell: ({ row } : {row : any}) => (
        <div className="flex flex-col">
          <span className="text-white text-base">{row.original.Booking.length}</span>
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row } : {row : any}) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1c1c24] border-[#2e2e3a]">
              <DropdownMenuItem onClick={() => handleEdit(user)} className="text-white hover:bg-[#24242c]">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRemove(user.id)} className="text-white hover:bg-[#24242c]">
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
          <h2 className="text-2xl font-bold text-white">Customers</h2>
          <p className="text-gray-400">Manage your system customers</p>
        </div>
      </div>
      <CustomerDataTable columns={columns} data={customers || []} />
      {editingUser && <EditUserModal user={editingUser} onClose={() => setEditingUser(null)} onSave={handleSave} />}
    </div>
  )
}

