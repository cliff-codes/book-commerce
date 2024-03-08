
import { connectToDB } from "@/app/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { searchedBooks } from "@/app/lib/data";
import { NextResponse } from "next/server";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req)

//   console.log('End point is working')
//   // Access the query parameter from the request
//   const query = req.query.query;
//   console.log("Received Query : " + query)


//   // connect to database
//   await connectToDB()
//   try {
//     const books = await searchedBooks(query); // Replace with your actual search function

//     // Send the results as a JSON response
//     res.status(200).json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch search results" });
//   }
// }

export async function GET(req: Request){
  console.log("hitting this end point")
  const {searchParams} = new URL(req.url)
  const query = searchParams.get('query')

  console.log("Query is :"+query)

  //connect to DB
  await connectToDB()

  if(query){
    try {
      const books = await searchedBooks(query)
      return Response.json(books)
    } catch (error) {
      console.log(error)
      return Response.json({error: "Failed to fetch data"})
    }
  }
}

