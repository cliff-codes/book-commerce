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
        console.log(error)
        throw new Error("Error fetching books")
    }
}



export const getBook =async (id:string) => {
    try {
        await connectToDB()

        const book = await Book.findById(id)
        const bookObject = book.toObject();
        
        console.log({...bookObject, _id: bookObject._id.toString()})
    
        return {...bookObject, _id: bookObject._id.toString()}
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch book")
    }
}

