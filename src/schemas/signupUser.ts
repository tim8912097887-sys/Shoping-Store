import * as z from "zod"


export const SignupUserSchema = z.object({
    username: z.string("Username must be string").min(2,"Username at least two character"),
    email: z.email(),
    password: z.string("Password must be string").min(6,"Password at least six character")
})

export type SignupUser = z.infer<typeof SignupUserSchema>;