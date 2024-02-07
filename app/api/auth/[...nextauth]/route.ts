

import { User } from "@/app/lib/models"
import { connectToDB } from "@/app/lib/utils"
import NextAuth from "next-auth/next"
import  CredentialsProvider  from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'


export const authOptions = {
    providers: [
        CredentialsProvider({
            name : "credentials",
            credentials: {},

            async authorize(credentials) {
                const {email , password} = credentials
                
                try {
                    await connectToDB()

                    const user = await User.findOne({email})

                    if(!user){
                        return null
                    }

                    const passwordMatched = await bcrypt.compare(password, user.password)
                    
                    if(!passwordMatched){
                        return null
                    }

                    return user

                } catch (error) {
                    console.log("error", error)
                }
            },
        })
    ],
    session:{
        strategy : "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions as any)
export {handler as GET, handler as POST}