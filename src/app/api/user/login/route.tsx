import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/app/api/user/login/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function POST(req: NextRequest ) {
    const session =   getServerSession(authOptions)
    if (!session) {
        return NextResponse.json(
          { message: "Unauthorized" },
          {
            status: 401,
          },
        );
      }
    try {
       let {formdata,error} = await req.json()    
       loginUser(formdata)
       
    }
    catch(error) {
        console.error("getting error in login page")
    }






}