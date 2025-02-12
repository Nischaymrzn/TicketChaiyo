import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Upload } from "lucide-react"
import { movieSchema, type MovieFormData } from "../_schema"

interface MovieFormProps {
  onSubmit: (data: MovieFormData) => void
  onCancel?: () => void
  initialData?: MovieFormData
}

export function MovieForm({ onSubmit, onCancel, initialData }: MovieFormProps) {
  const form = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: initialData?.title || "",
      duration: initialData?.duration || "",
      genre: initialData?.genre || "",
      director: initialData?.director || "",
      cast: initialData?.cast || "",
      description: initialData?.description || "",
      ticketPriceNormal: initialData?.ticketPriceNormal || "",
      ticketPriceVip: initialData?.ticketPriceVip || "",
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      venue: initialData?.venue || "",
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form

  return (
    <Card className="w-full max-w-3xl border-none shadow-none bg-[#1C1C24] text-white">
      <CardHeader className="p-6">
        <CardTitle className="text-2xl font-bold">{initialData ? "Edit" : "Create"} Movie Event</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[75vh] pr-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movie Title</FormLabel>
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
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
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
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
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
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Director</FormLabel>
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
                name="cast"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cast</FormLabel>
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
                name="poster"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poster</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              field.onChange(file)
                            }
                          }}
                          className="hidden"
                          id="poster-upload"
                        />
                        <label
                          htmlFor="poster-upload"
                          className="flex items-center justify-center w-full px-4 py-3 bg-[#2A2A35] text-white rounded-md cursor-pointer hover:bg-[#3A3A45] transition-colors duration-200"
                        >
                          <Upload className="w-5 h-5 mr-2" />
                          {field.value ? "Change Poster" : "Upload Poster"}
                        </label>
                        {field.value && (
                          <p className="mt-2 text-sm text-gray-400">
                            File selected: {field.value instanceof File ? field.value.name : "Previous poster"}
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Image</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              field.onChange(file)
                            }
                          }}
                          className="hidden"
                          id="cardImage-upload"
                        />
                        <label
                          htmlFor="cardImage-upload"
                          className="flex items-center justify-center w-full px-4 py-3 bg-[#2A2A35] text-white rounded-md cursor-pointer hover:bg-[#3A3A45] transition-colors duration-200"
                        >
                          <Upload className="w-5 h-5 mr-2" />
                          {field.value ? "Change Card Image" : "Upload Card Image"}
                        </label>
                        {field.value && (
                          <p className="mt-2 text-sm text-gray-400">
                            File selected: {field.value instanceof File ? field.value.name : "Previous card image"}
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ticketPriceNormal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Normal Ticket Price</FormLabel>
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
              <FormField
                control={form.control}
                name="ticketPriceVip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VIP Ticket Price</FormLabel>
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
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Event Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-[#2A2A35] border-gray-700 hover:bg-[#3A3A45] hover:text-white focus:ring-[#FFC987]",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-[#2A2A35] border-gray-700 h-24 text-lg focus:border-[#FFC987] focus:ring-[#FFC987]"
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
                  {initialData ? "Update" : "Create"} Movie Event
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

