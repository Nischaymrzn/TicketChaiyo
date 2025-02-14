import { useGetOrganizerEvents } from "@/hooks/useEvent"
import { CustomerDataTable } from "./_components/CustomerDataTable"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export const CustomerPage = () => {
  const data = useGetOrganizerEvents()
  const eventData = data?.data?.events || []

  const columns = [
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row } : {row : any}) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 bg-[#2e2e3a]">
            <AvatarFallback className="text-black">{row.original.customerName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-white font-medium">{row.original.customerName}</span>
            <span className="text-sm text-gray-400">{row.original.email}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "eventName",
      header: "Event",
      cell: ({ row } : {row : any}) => (
        <div className="flex flex-col">
          <span className="text-white text-base">{row.original.eventName}</span>
          <span className="text-xs text-gray-400">{row.original.type}</span>
        </div>
      ),
    },
    {
      accessorKey: "bookedDate",
      header: "Booked Date",
      cell: ({ row } : {row : any}) => {
        const date = new Date(row.original.bookedDate)
        return (
          <div className="flex flex-col">
            <span className="text-white">{date.toLocaleDateString()}</span>
            <span className="text-sm text-gray-400">{date.toLocaleTimeString()}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "quantity",
      header: "Tickets",
      cell: ({ row } : {row : any}) => <div className="font-medium text-white">{row.original.quantity}</div>,
    },
    {
      accessorKey: "totalPrice",
      header: "Total Amount",
      cell: ({ row } : {row : any}) => (
        <div className="font-medium text-gray-200">
          {row.original.totalPrice}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row } : {row : any}) => (
        <div
          className={`
          inline-flex items-center p-2 rounded-md text-xs font-medium capitalize
          ${
            row.original.status === "active"
              ? "bg-[#3fb1a7] bg-opacity-20 text-[#FFC987]"
              : "bg-[#3fb1a7] bg-opacity-20 text-red-500"
          }
        `}
        >
          {row.original.status}
        </div>
      ),
    },
  ]

  const customerData = eventData.flatMap((event : any) =>
    event.bookings.map((booking : any) => ({
      customerName: booking?.client?.name || "N/A",
      email: booking?.client?.email || "N/A",
      bookedDate: booking.bookedAt,
      eventName: event.title,
      type: event.type,
      quantity: booking.quantity,
      totalPrice: booking.price,
      status: "active",
    })),
  )

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Customers</h2>
          <p className="text-gray-400">Manage your customer bookings and ticket sales</p>
        </div>
      </div>
      <CustomerDataTable columns={columns} data={customerData} />
    </div>
  )
}

