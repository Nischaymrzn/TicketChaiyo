import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ClientNav from "./_components/ClientNav"
import { Separator } from "@/components/ui/separator"
import { useCheckout } from "@/state-stores/CheckoutContext"
import { useGetEvent } from "@/hooks/useEvent"
import { BookingData, useAddBooking } from "@/hooks/useBookings"
import { useGetMe } from "@/hooks/useAuth"


interface BillingForm {
  fullName: string
  email: string
  country: string
  state: string
  city: string
  zipCode: string
}

export const EventCheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const { checkoutData, clearCheckoutData } = useCheckout()
  const [billingForm, setBillingForm] = useState<BillingForm>({
    fullName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  })
  const { id } = useParams()
  const { data } = useGetEvent(id as string)

  const user = useGetMe()
  const userId = user?.data?.userData?.id

  const eventData = data?.event ?? {}

  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setBillingForm((prev) => ({ ...prev, [name]: value }))
  }

  const  addBooking  = useAddBooking()

  const handleConfirmAndPay = async () => {

    const bookingData: BookingData = {
      //@ts-ignore
      quantity: checkoutData?.eventType == "CONCERT" ? checkoutData?.normalTickets + checkoutData?.vipTickets : checkoutData.selectedSeats?.length as number,
      seats: checkoutData?.selectedSeats ?? [] as string[],
      price: checkoutData?.totalAmount * 1.13,
      name: billingForm?.fullName,
      email: billingForm?.email,
      country: billingForm?.country,
      state: billingForm?.state,
      city: billingForm?.city,
      normalTicketQty : checkoutData?.normalTickets, 
      vipTicketQty : checkoutData?.vipTickets,
      clientId: userId,
      eventId: id as string, 
  }

    const response = await addBooking.mutateAsync(bookingData)
    console.log(response)
    clearCheckoutData()
    navigate(`/event/${id}/bookingConfirmed/${response?.id}`) 
  }

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-[#13131A] text-white overflow-hidden">
      <ClientNav />

      <div className="container px-4 py-8 mx-auto text-white">
        <h1 className="text-2xl font-semibold mb-2">Order Confirmation</h1>
        <Separator className="mb-4 bg-gray-700" />

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <Card className="bg-[#1C1C24] border-0">
              <CardHeader>
                <CardTitle className="text-white text-xl tracking-wide">Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-white">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={billingForm.fullName}
                    placeholder="e.g. Nischay Maharjan"
                    className="bg-[#13131a] border border-gray-800 py-5"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={billingForm.email}
                    placeholder="e.g. nischay@xyz.com"
                    className="bg-[#13131a] border border-gray-800 py-5"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={billingForm.country} onValueChange={(value) => handleSelectChange("country", value)}>
                      <SelectTrigger className="bg-[#13131a] border-0 py-5">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="nepal" className="border-b">
                          Nepal
                        </SelectItem>
                        <SelectItem value="india">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={billingForm.state} onValueChange={(value) => handleSelectChange("state", value)}>
                      <SelectTrigger className="bg-[#13131a] border border-gray-800 py-5">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="bagmati" className="border-b">
                          Bagmati
                        </SelectItem>
                        <SelectItem value="gandaki" className="border-b">
                          Gandaki
                        </SelectItem>
                        <SelectItem value="koshi" className="border-b">
                          Koshi
                        </SelectItem>
                        <SelectItem value="karnali">Karnali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={billingForm.city}
                      placeholder="Enter city"
                      className="bg-[#13131a] border border-gray-800 py-5"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Zip/Post Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={billingForm.zipCode}
                      placeholder="Enter zip code"
                      className="bg-[#13131a] border border-gray-800 py-5"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1C1C24] border-0">
              <CardHeader>
                <CardTitle className="text-white text-xl tracking-wide">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="esewa" id="esewa" className="border-gray-600 text-gray-300" />
                    <Label htmlFor="esewa" className="text-white">
                      Pay with eSewa
                      <p className="text-sm text-gray-400">Fast and secure digital wallet</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="khalti" id="khalti" className="border-gray-600 text-gray-300" />
                    <Label htmlFor="khalti" className="text-white">
                      Pay with Khalti
                      <p className="text-sm text-gray-400">Quick and easy mobile payments</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" className="border-gray-600 text-gray-300" />
                    <Label htmlFor="cod" className="text-white">
                      Pay at Venue
                      <p className="text-sm text-gray-400">Pay when collecting your tickets</p>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#1C1C24] border border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-xl tracking-wide">Checkout Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4 bg-[#13131A] p-4 rounded-lg border border-gray-700">
                <div className="relative h-20 w-16 overflow-hidden rounded-lg">
                  <img
                    src={eventData.poster || "/placeholder.svg"}
                    alt="Event poster"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-medium text-white">{eventData.title}</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="mr-1 h-4 w-4" />
                    {eventData.venue}
                  </div>
                  {checkoutData.eventType === "MOVIE" && (
                    <div className="text-sm text-gray-400">
                      Selected Seats: {checkoutData.selectedSeats?.join(", ")}
                    </div>
                  )}
                  {checkoutData.eventType === "CONCERT" && (
                    <div className="text-sm text-gray-400">
                      Normal Tickets: {checkoutData.normalTickets}, VIP Tickets: {checkoutData.vipTickets}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sub Total</span>
                  <span className="text-white">रु {checkoutData.totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax</span>
                  <span className="text-white">रु {(checkoutData.totalAmount * 0.13).toFixed(2)}</span>
                </div>
                <Separator className="my-2 bg-gray-700" />
                <div className="flex justify-between font-medium">
                  <span className="text-white">Total</span>
                  <span className="text-white">रु {(checkoutData.totalAmount * 1.13).toFixed(2)}</span>
                </div>
              </div>

              <Button className="border p-2 bg-[#FFC987] rounded-lg px-4 font-medium transition hover:bg-[#e2ae89] text-black w-full border-gray-400" disabled={!paymentMethod}
                onClick={handleConfirmAndPay}>
                Confirm & Pay
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

