import { connectToDB } from "@/app/lib/utils"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { User } from "@/app/lib/models"

export async function POST(req:any) {
    try {
        const {username, email, password} = await req.json()
        
        //connect to database
        await connectToDB() 
        
        //hashpassword
        const hashedPassword = await bcrypt.hash(password, 10)

        //save user
        await User.create({username, email, password:hashedPassword})

        return NextResponse.json({message: "User Registered"}, {status: 201})

    } catch (error) {
        return NextResponse.json({
            message: "An error occurred while registering user"
        }, {status: 500})
    }
}