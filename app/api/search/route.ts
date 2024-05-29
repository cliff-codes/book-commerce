
import { connectToDB } from "@/app/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { searchedBooks } from "@/app/lib/data";
import { NextResponse } from "next/server";



export async function GET(req: Request){
  const {searchParams} = new URL(req.url)
  const query = searchParams.get('query')

  

  //connect to DB
  await connectToDB()

  if(query){
    try {
      const books = await searchedBooks(query)
      return Response.json(books)
    } catch (error) {
      (error)
      return Response.json({error: "Failed to fetch data"})
    }
  }
}

