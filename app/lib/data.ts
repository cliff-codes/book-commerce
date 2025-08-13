"use server"

import { Book } from "./models"
import { connectToDB } from "./utils"

interface Book {
    _id: any,
    title: string,
    description: string,
    category: string,
    price: number,
    img: string
}


export const fetchBooks = async(): Promise<Book[]> => {
    try {
        await connectToDB()
        
        const books:Book[] = await Book.find({}).lean()

        const bookData:Book[] = books.map(book  => ({
            _id: book._id.toString(),
            title: book.title,
            description: book.description,
            category: book.category,
            price : book.price,
            img: book.img
        }))
    
        return bookData
    } catch (error: any) {
        console.error('Error fetching books:', error)
        return []
    }
}


export const searchedBooks = async(searchTerm: string) => {
    try {
        await connectToDB()

        //exact matches in the search
        const exactMatches = await Book.find({title: searchTerm})

        //partial matches using regular expression (case-insensitive)
        const regex = new RegExp(searchTerm, 'i')
        const partialMatches = (await Book.find({$or: [
            { title: { $regex: regex } },
            { author: { $regex: regex } },
            // ... add other searchable fields here
          ],}).where('title').ne(searchTerm))//this excludes exact matches

        //combined results with the exact-matches at the top and the partial matches below.
        const combinedResults = [...exactMatches, ...partialMatches]
       
        return JSON.stringify(combinedResults)
    } catch (error) {
        throw new Error("Failed to search")
    }
}



export const getBook = async (id: string) => {
    try {
        // Validate if the id is a valid MongoDB ObjectId (24 character hex string)
        if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
            return null
        }

        await connectToDB()

        const book = await Book.findById(id)
        
        if (!book) {
            return null
        }
        
        const bookObject = book.toObject();
    
        return {...bookObject, _id: bookObject._id.toString()}
    } catch (error) {
        console.error('Error fetching book:', error)
        return null
    }
}

