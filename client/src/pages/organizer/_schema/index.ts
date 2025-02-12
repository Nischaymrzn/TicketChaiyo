import { z } from "zod"

export const organizerSignupFormSchema = z.object({
  fullName : z.string().min(1,"Name can't be empty").min(3,"Name cannot be less than 3 characters"),
  organizationName : z.string().min(1,"Organization Name can't be empty"),
  email :z.string().min(1,"email can't be empty").email("Email must be valid"),
  userName: z.string().min(1, "Username can't be empty").min(3, "Username can't be less than 3 characters"),
  password: z.string().min(1, "Password can't be empty").min(8,"password must be 8 characters"),    
});

const eventBaseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ticketPriceNormal: z.string().min(1, "Normal ticket price is required"),
  ticketPriceVip: z.string().min(1, "VIP ticket price is required"),
  date: z.date(),
  venue: z.string().min(1, "Venue is required"),
  description: z.string().optional(),
  poster: z.instanceof(File).optional(),
  cardImage: z.instanceof(File).optional(),
})

export const movieSchema = eventBaseSchema.extend({
  duration: z.string().min(1, "Duration is required"),
  genre: z.string().min(1, "Genre is required"),
  director: z.string().min(1, "Director is required"),
  cast: z.string().min(1, "Cast is required"),
})

export const concertSchema = eventBaseSchema.extend({
  artist: z.string().min(1, "Artist is required"),
})

export type MovieFormData = z.infer<typeof movieSchema>
export type ConcertFormData = z.infer<typeof concertSchema>



