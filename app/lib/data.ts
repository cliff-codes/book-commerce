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