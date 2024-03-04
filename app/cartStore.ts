import {create} from 'zustand'
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist((set, get) => ({
    books: [],

    addToCart: (book:any) => set((state:any) => ({books: [...state.books, book]})),

    removeBook: (bookId: string) => set((state: any) => ({
        books: state.books.filter((b: any) => b._id !== bookId)
    })),

    bookExist: (bookId: string) => get().books.some((book: any) => book._id === bookId),

    findBook: (bookId: string) => get().books.find((book: any) => book._id === bookId),
    
    increaseQty: (bookId: string) => set((state:any) => ({
        books: state.books.map((book:any) => book._id === bookId ? { ...book, qty: book.qty + 1 } : book)
    })),

    decreaseQty: (bookId: string) => set((state:any) => ({
        books: state.books.map((book:any) => book._id === bookId ? { ...book, qty: book.qty > 1 ? book.qty -1 : null } : book)
    })),

    //reset to initial state
    reset: () => set((state: any) => (
        {books: []}
    )),

    //get all persisted books
    getPersistedBooks: () => ({...get()}),

    //get the number of total persisted books
    getNumberOfPersistedBooks: () => get().books.length,

    // Method to calculate total cost of all books
    getTotalCost: () => {
        const books = get().books;
        return books.reduce((total:number, book:any) => total + (book.price * book.qty), 0);
    },
    
}), {
    name: "cart-storage",
    getStorage: () => localStorage,
    partialize: (state: any) => ({books: state.books}) 
}))