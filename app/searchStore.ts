
import {create} from 'zustand'


interface SearchState {
    searchResults: any[]
    loading: boolean
    error: string | null,
    dataFetched: boolean
}

const initialState: SearchState = {
    searchResults: [],
    loading: false,
    error: null,
    dataFetched: false
}

export const useSearchStore = create<SearchState>((set, get) => ({
    ...initialState,
  
    getSearchedData: async (query: string) => {
      set({ loading: true }); // Update loading state
  
      try {
        const res = await fetch(`/api/search?query=${query}`);
        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }
  
        const rawData = await res.json();
        const data = await JSON.parse(rawData)
       
        if (Array.isArray(data)) {
            set({ searchResults: [...data], loading: false, error: null, dataFetched: true });  
        }else{
            set({searchResults: [ data], dataFetched: true})
        }
      } catch (error) {
        set({ loading: false, error: 'Unknown error' });
      }
    },
  
  }))