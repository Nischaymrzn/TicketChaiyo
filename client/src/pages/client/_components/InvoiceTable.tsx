import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
  const InvoiceTable = ({eventDetails ,bookingDetails} : {eventDetails : any ,bookingDetails : any}) => {
    console.log(bookingDetails)

    console.log(eventDetails)
    return (
      <Table className="mt-6 bg-white border rounded-md border-border">
        <TableHeader>
          <TableRow className="bg-[#F7F8F9] text-[#556987] hover:bg-[#F7F8F9]">
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Event Detail</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead className="text-middle">Ticket</TableHead>
            <TableHead className="text-middle">Unit Price</TableHead>
            <TableHead className="text-middle">Tax</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
        {bookingDetails.normalTicketQty > 0 && (
          <TableRow className="text-black bg-white hover:bg-white">
            <TableCell>Normal</TableCell>
            <TableCell>{eventDetails?.title}</TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>X{bookingDetails?.normalTicketQty}</TableCell>
            <TableCell>NRS. {bookingDetails.normalTicketQty * eventDetails?.ticketPriceNormal}</TableCell>
            <TableCell>NRS. {(bookingDetails.normalTicketQty * eventDetails?.ticketPriceNormal * 0.13).toFixed(2)}</TableCell>
            <TableCell className="text-right">
              NRS. {(bookingDetails?.normalTicketQty * eventDetails?.ticketPriceNormal * 1.13).toFixed(2)}
            </TableCell>
          </TableRow>
        )}

        {bookingDetails.vipTicketQty > 0 && (
          <TableRow className="text-black bg-white hover:bg-white">
            <TableCell>Vip</TableCell>
            <TableCell>{eventDetails?.title}</TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>X{bookingDetails?.vipTicketQty}</TableCell>
            <TableCell>NRS. {bookingDetails.vipTicketQty * eventDetails?.ticketPriceVip}</TableCell>
            <TableCell>NRS. {(bookingDetails.vipTicketQty * eventDetails?.ticketPriceVip * 0.13).toFixed(2)}</TableCell>
            <TableCell className="text-right">
              NRS. {(bookingDetails?.vipTicketQty * eventDetails?.ticketPriceVip * 1.13).toFixed(2)}
            </TableCell>
          </TableRow>
        )}
        </TableBody>
        
        {bookingDetails &&
        <TableFooter className="w-full text-black bg-white">
          <TableRow>
            <TableCell className="text-xl text-right" colSpan={7}>
              Invoice Total: NRS. {(bookingDetails?.price)}
            </TableCell>
          </TableRow>
        </TableFooter>
        }
      </Table>
    );
  };
  
  export default InvoiceTable;