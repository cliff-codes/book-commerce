import mongoose from "mongoose";

interface ConnectionsStatus {
    isConnected ?: number
}

let connection : ConnectionsStatus = {}
const password = process.env.password


export const connectToDB = async () => { 
    try {
        if(connection.isConnected) return;

        const db = await mongoose.connect(`mongodb+srv://simplecodes2580:${password}@cluster0.l9ttk1e.mongodb.net/?retryWrites=true&w=majority`)

        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        throw new Error(error as any)
    }
}