
import {NextApiRequest, NextApiResponse} from 'next'
import NextAuth from 'next-auth/next';
import { authOptions } from './authOptions';

const handler = (req:NextApiRequest , res: NextApiResponse) => {
    return NextAuth(authOptions)(req, res);
};

export const GET = handler;
export const POST = handler;