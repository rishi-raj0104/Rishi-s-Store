import { connect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    await connect();
    return NextResponse.json({
        success: true,
        message: 'Connection Success'
    })
}