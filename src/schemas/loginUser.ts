import * as z from "zod"


export const LoginUserSchema = z.object({
    username: z.string("Username must be string").min(2,"Username at least two character"),
    password: z.string("Password must be string").min(6,"Password at least six character")
})

export type LoginUser = z.infer<typeof LoginUserSchema>;