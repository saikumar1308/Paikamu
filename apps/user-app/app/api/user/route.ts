// import {PrismaClient} from "@repo/db/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";

// const client = new PrismaClient();

export async function GET() {
    const session = await getServerSession(authOptions);
    if(session.user) {
        return NextResponse.json({
            user:session.user
        })
    }
    return NextResponse.json({
        message: "data created!!!"
    },{
        status:403
    })
}