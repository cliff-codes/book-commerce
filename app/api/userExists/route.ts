import { User } from "@/app/lib/models"
import { connectToDB } from "@/app/lib/utils"
import { NextResponse } from "next/server"

export async function POST(req:any) {
    try {
        await connectToDB()
        const {email} = await req.json()

        const user = await User.findOne({email}).select("_id")

        return NextResponse.json({user})
    } catch (error) {
        NextResponse.json(error)
    }
}