
//api/payment/route.ts
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req:any) {
  const {email, amount} = await req.json()

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  const data = {
    email: email,
    amount: amount * 100, // Paystack expects the amount in the smallest currency unit
    callback_url: "http://localhost:3000"
  };

  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', data, {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json',
      },
    });
 
    return NextResponse.json(response.data);
    // return response.data
  } catch (error) {
    console.error('Payment processing error:', error);
    return error
  }
}

  
