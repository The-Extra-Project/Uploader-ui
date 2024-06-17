import {getServerSession} from "next-auth/next"
import { z } from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { userNameSchema, userIdSchema } from "@/lib/auth-validation"



const routeContextSchema = z.object({
    params: z.object({
      userId: z.string(),
    }),
  })
  
/**
 * fetches the user details from the database to showcase on the application
 * @returns gets the username
 */
export async function GET(
    req: Request,
    context: z.infer<typeof routeContextSchema>
) {
    try {
        // Validate the route context.
        const { params } = routeContextSchema.parse(context)
        // Ensure user is authentication and has access to this user.
        const session = await getServerSession(authOptions)
        if (!session?.user || params.userId !== session?.user.id) {

          return new Response(null, { status: 403 })
        }
        // Get the request body and validate it.
        const body = await req.json()
        const payload = userIdSchema.parse(body)
        // Update the user.
      let userName =  await db.from("users").select('username').eq('userId', payload.userId)
      return new Response(JSON.stringify(userName) , { status: 200 })
      } catch (error) {
        if (error instanceof z.ZodError) {
          return new Response(JSON.stringify(error.issues), { status: 422 })
        }
        return new Response(null, { status: 500 })
      }
}


