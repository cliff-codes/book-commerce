import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  _id: string;
  title: string;
  price: number;
  img: string;
  description: string;
  author?: string;
  rating?: number;
  addedAt: Date;
}

interface WishlistStore {
  items: WishlistItem[];
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (item) => {
        const { items } = get();
        const exists = items.find(i => i._id === item._id);
        
        if (!exists) {
          set({
            items: [...items, { ...item, addedAt: new Date() }]
          });
        }
      },
      
      removeFromWishlist: (id) => {
        const { items } = get();
        set({
          items: items.filter(item => item._id !== id)
        });
      },
      
      isInWishlist: (id) => {
        const { items } = get();
        return items.some(item => item._id === id);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
      
      getWishlistCount: () => {
        const { items } = get();
        return items.length;
      }
    }),
    {
      name: 'wishlist-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
