"use server"
import { getServerSession } from "next-auth";
import {NextResponse} from "next/server";
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"


interface AnalystProps {
    id: string,
    amount: number,
    status: string,
    email: string,
}

export async function GET(req: Request) {
    const session = getServerSession(authOptions)
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            {
                status: 401,
            }
        );
    }

    const fetchProgressedStatus = async () => {

        //const analysts = await db.from("Users").select("id amount );
        
        
        
        // .findMany({
        //     where: {
        //         email: session.user.email,
        //     },
        //     select: {
        //         id: true,
        //         amount: true,
        //         status: true,
        //         email: true,
        //     },
        // })

    }




}