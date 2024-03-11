
import {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { connectToDB } from "@/app/lib/utils";
import { User } from "@/app/lib/models";

export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if(!credentials){
                    throw new Error("Credentials are not provided")
                }

                // Connect to the database
                await connectToDB();

                // You might need to adjust this part based on how you've implemented `User.findOne`
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error('No user found with the email');
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error('Password does not match');
                }

                // Return user object on successful authentication
                return { id: user.id, name: user.name, email: user.email };
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user } : any) => {
            // Add user id to the JWT token
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token } : any) => {
            // Add user id to the session
            if (token) {
                (session as any).id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login', // Specifies a custom sign-in page
        // Add other custom pages if needed
    },
    secret: process.env.NEXTAUTH_SECRET, // It's important to set a secret for security reasons
};
