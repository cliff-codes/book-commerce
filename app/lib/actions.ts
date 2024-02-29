"use server"
import { revalidatePath } from "next/cache"
import { Book, User } from "./models"
import { connectToDB } from "./utils"
import { redirect } from "next/navigation"
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server"


export const addBook = async(e:FormData) => {
    

    const {title, price, img, description, category, author} = Object.fromEntries(e)
    
    try {
        await connectToDB()

        const newBook = new Book({ title, price, img, description, category, author})
       
        const res = await newBook.save()
     
    } catch (error) {
        throw new Error("Failed to add book")
    }

    revalidatePath('/cms/dashboard/manage')
    redirect('/cms/dashboard/manage')
}
 
export const updateBook =async (e:FormData) => {
    
    const {id} = Object.fromEntries(e) 

    const bookObj = Object.fromEntries(e)
    try {
        await connectToDB()
        
        
        //delete all empty and undefined fields
        for(const key of Object.keys(bookObj)){
            if (bookObj[key] === "" || bookObj === null || bookObj === undefined){
                delete bookObj[key]
            }
        }
        
        //update book
        const res =  await Book.findByIdAndUpdate(id, bookObj)
       
    } catch (error) {
        throw new Error("Error updating book")
    }

    revalidatePath('/cms/dashboard/manage')
    redirect('/cms/dashboard/manage')
}

export const deleteBook = async(id:string) => {
    try {
        await connectToDB()

        await Book.findByIdAndDelete(id)
    } catch (error) {
        throw new Error("Failed to delete book!")
    }
    revalidatePath('/cms/dashboard/manage')
}

export const addUser = async(e:FormData) => {
    const {username, password, email} = Object.fromEntries(e)
    
    if(!username || !email || !password){
        return NextResponse.json({error: "input data missing"}, {status: 500})
    }

    try {

        //connect database
        await connectToDB()
        

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =  await bcrypt.hash(password as string,salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()

    } catch (error) {
        console.log(error)
        throw new Error("Failed to create account")
    }
    redirect("/login")
}