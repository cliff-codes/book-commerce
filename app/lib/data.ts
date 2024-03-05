import { Book } from "./models"
import { connectToDB } from "./utils"



export const fetchBooks = async() => {
    try {
        await connectToDB()

        const booksData = await Book.find({})
       
        const books = booksData.map(book => {
            return book._doc
        })

        return {books}

    } catch (error) {
        return error
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

        return combinedResults
    } catch (error) {
        throw new Error("Failed to search")
    }
}



export const getBook =async (id:string) => {
    try {
        await connectToDB()

        const book = await Book.findById(id)
        const bookObject = book.toObject();
    
        return {...bookObject, _id: bookObject._id.toString()}
    } catch (error) {
        throw new Error("Failed to fetch book")
    }
}

