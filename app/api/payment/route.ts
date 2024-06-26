import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

type TPostRequestBody = {
  // Define the expected properties and types for your POST request body here
  email: string;
  amount: number;
};

// Named export for the POST method handler
export async function POST(req: any, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Unsupported method' }, { status: 405 });
  }

  try {
    const { email, amount } = await req.json();
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Missing PAYSTACK_SECRET_KEY environment variable');
    }

    const data = {
      email,
      amount: amount * 100, // Paystack expects the amount in the smallest currency unit
      callback_url: "https://book-commerce-black.vercel.app/", 
      currency: "GHS"
    };

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      data,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


