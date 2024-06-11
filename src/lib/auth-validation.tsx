import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
})

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})
