import { format, parseISO } from "date-fns";
import { usePDF } from "react-to-pdf";
import { Calendar, TicketIcon } from "lucide-react";
import ScissorsDashLine from "@/components/ui/scissors-dashline";
import InvoiceTable from "./_components/InvoiceTable";
import { useParams } from "react-router";
import { useGetBooking } from "@/hooks/useBookings";
import { useGetEvent } from "@/hooks/useEvent";

const Invoice = () => {
    const {id} = useParams()
    const { data } = useGetBooking(id as string)
    const booking = data?.bookings ?? {}
    const eventId = booking?.eventId
    const { data : event } = useGetEvent(eventId)
    const eventData = event?.event ?? {}
    console.log("hello",booking)
    console.log(eventData)

  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  return (
    <div className="flex flex-col items-center w-full bg-[#1c1c24] overflow-hidden">
      {booking? (
        <div className="pb-6 bg-gray-300 w-full sm:w-[900px] flex flex-col justify-center items-center border border-gray-400 rounded-sm my-2">
          <div
            className=" min-h-[29.7cm] w-full sm:w-[850px] overflow-hidden"
            ref={targetRef}
          >
            <div className="flex items-center justify-between">
            <div className="z-10 w-full px-6 py-6 text-xl font-semibold text-black">
              TicketChayo.com
            </div>
            <button
            className="p-2 text-black bg-[#FFC987] rounded-lg px-8 font-medium transition hover:bg-[#FFB988] mr-4"
            onClick={() => toPDF()}
          >
            Download
          </button>
          </div>

            

            <div className="flex flex-col items-start p-6">
              <p className="text-lg font-semibold text-black">Invoice</p>

              <div className="flex items-start justify-between w-full mt-4">
                <div className="flex flex-col gap-2">
                  <p>Invoice to {booking?.name}</p>

                  <p>
                    {booking?.country}
                    {", "}
                    {booking?.city}
                  </p>

                  <p>
                    {booking?.state}
                    {", "}
                    {booking?.country}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <p>ID: {booking?.id}</p>

                  <p>Date: {format(new Date(), "dd MMMM yyyy")}</p>
                </div>
              </div>

              <InvoiceTable eventDetails={eventData} bookingDetails={booking}/>

              {booking && booking.normalTicketQty > 0 &&
                  <div
                    key={booking.quantity}
                    className="flex flex-col items-center justify-center gap-0 -mt-12"
                  >
                    <ScissorsDashLine />

                    <div className="flex items-center w-full gap-4 p-6 mb-8 -mt-12 bg-white border rounded-sm">
                      <img
                        width={800}
                        height={800}
                        src={eventData.cardImage}
                        alt=""
                        className="rounded-md w-28"
                      />

                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold text-black">
                          {eventData.title}
                        </p>

                        <p className="flex items-center gap-2">
                          <span><Calendar className="w-5"/></span>
                          {format(parseISO(booking?.bookedAt), "yyyy-MM-dd")}
                        </p>

                        <div className="flex items-center gap-2">
                          <TicketIcon className="text-red-500 w-5" />
                          <p className="font-semibold text-red-500">x{booking.normalTicketQty} Normal</p>
                        </div>

                        <p className="">
                          Total:{" "}
                          <span className="font-semibold text-black">
                          {(booking.normalTicketQty * eventData?.ticketPriceNormal * 1.075).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                }

                {booking && booking.vipTicketQty > 0 &&
                  <div
                    key={booking.quantity}
                    className="flex flex-col items-center justify-center gap-0 -mt-12"
                  >
                    <ScissorsDashLine />

                    <div className="flex items-center w-full gap-4 p-6 mb-8 -mt-12 bg-white border rounded-sm border-border">
                      <img
                        width={800}
                        height={800}
                        src={eventData.cardImage}
                        alt=""
                        className="rounded-md w-28"
                      />

                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold text-black">
                          {eventData.title}
                        </p>

                        <p className="flex items-center gap-2">
                          <span><Calendar className="w-5"/></span>
                            {format(parseISO(booking?.bookedAt), "yyyy-MM-dd")}
                        </p>

                        <div className="flex items-center gap-2 text-blue-500">
                          <TicketIcon className="w-5" />
                          <p className="font-semibold">x{booking.vipTicketQty} Vip</p>
                        </div>

                        <p className="">
                          Total:{" "}
                          <span className="font-semibold text-black">
                          {(booking.vipTicketQty * eventData?.ticketPriceVip * 1.075).toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                }
            </div>
          </div>

          
        </div>
      ) : null}
    </div>
  );
};

export default Invoice;