import { z } from "zod"

export const organizerSignupFormSchema = z.object({
    fullName : z.string().min(1,"Name can't be empty").min(3,"Name cannot be less than 3 characters"),
    organizationName : z.string().min(1,"Organization Name can't be empty"),
    email :z.string().min(1,"email can't be empty").email("Email must be valid"),
    userName: z.string().min(1, "Username can't be empty").min(3, "Username can't be less than 3 characters"),
    password: z.string().min(1, "Password can't be empty").min(8,"password must be 8 characters"),
    
});


