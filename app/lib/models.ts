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

export const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

