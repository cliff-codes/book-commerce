import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String
    }
}, {timestamps: true})



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const User = mongoose.models.User || mongoose.model("User", userSchema)

export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema)