import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
    }
}, {timestamps: true})

export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema)
