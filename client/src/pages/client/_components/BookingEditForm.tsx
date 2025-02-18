import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

const bookingEditSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
})

export type BookingEditFormData = z.infer<typeof bookingEditSchema>

interface BookingEditFormProps {
  onSubmit: (data: BookingEditFormData) => void
  onCancel?: () => void
  initialData?: Partial<BookingEditFormData>
}

export function BookingEditForm({ onSubmit, onCancel, initialData }: BookingEditFormProps) {
  const form = useForm<BookingEditFormData>({
    resolver: zodResolver(bookingEditSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      country: initialData?.country || "",
      state: initialData?.state || "",
      city: initialData?.city || "",
      quantity: initialData?.quantity || 1,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  const handleFormSubmit = (data: BookingEditFormData) => {
    console.log("Edited booking data:", data)
    onSubmit(data)
  }

  return (
    <Card className="w-full max-w-3xl border-none shadow-none bg-[#1C1C24] text-white">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold">Edit Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[75vh] pr-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#2A2A35] border-gray-700 h-12 text-lg focus:border-[#FFC987] focus:ring-[#FFC987]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="bg-[#2A2A35] border-gray-700 h-12 text-lg focus:border-[#FFC987] focus:ring-[#FFC987]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#2A2A35] border-gray-700 h-12 text-lg focus:border-[#FFC987] focus:ring-[#FFC987]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#2A2A35] border-gray-700 h-12 text-lg focus:border-[#FFC987] focus:ring-[#FFC987]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#2A2A35] border-gray-700 h-12 text-lg focus:border-[#FFC987] focus:ring-[#FFC987]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="bg-[#2A2A35] border-gray-700 h-12 text-lg focus:border-[#FFC987] focus:ring-[#FFC987]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-6">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="bg-[#2A2A35] text-white hover:bg-[#3A3A45] border-none"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  className="bg-[#FFC987] text-black hover:bg-[#FFD4A0] transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Update Booking
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

