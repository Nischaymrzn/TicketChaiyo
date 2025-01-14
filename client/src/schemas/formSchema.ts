import { z } from "zod"

const formSchema = z.object({
    email: z.string().min(1, "Email can't be empty").min(3, "Email can't be less than 3 characters"),
    password: z.string().min(1, "Password can't be empty").min(8,"password must be 8 characters"),
});

export default formSchema

