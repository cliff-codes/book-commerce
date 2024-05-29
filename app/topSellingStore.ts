
import {create} from 'zustand'
import { fetchBooks } from './lib/data'


interface FetchState {
    loading: boolean
    error: string | null,
    books: any[]
}

const initialState: FetchState = {
    loading: false,
    error: null,
    books: []
}


export const useTopSellingStore = create<FetchState>((set) => ({
    ...initialState,
    getFetchedData: async() => {
        set({loading: true})

        try {
            const res = await fetchBooks()

            set({loading: false,error: null, books: res})
        } catch (error) {
            
            set({ loading: false, error: "Error fetching data"});
        }
    }
  }))