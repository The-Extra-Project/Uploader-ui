import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email(),
})

export const userNameSchema = z.object({
  username: z.string().min(3).max(32),
})

export const userIdSchema = z.object({
  userId: z.number().min(1).max(64)
})
