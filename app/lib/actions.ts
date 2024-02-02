import { revalidatePath } from "next/cache"
import { Book } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"


export const addBook = async(e:FormData) => {
    "use server"

    const {title, price, img, description, category, author} = Object.fromEntries(e)

    try {
        await connectToDB()

        const newBook = new Book({ title, price, img, description, category, author})
        await newBook.save()
    } catch (error) {
        console.log(error)
        throw new Error("Failed to add book")
    }

    revalidatePath('/cms/dashboard/manage')
    redirect('/cms/dashboard/manage')
}