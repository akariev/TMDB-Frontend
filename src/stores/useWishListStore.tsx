import { Media } from '@/models/Media';
import { create } from 'zustand';

interface WishlistState {
    wishlist: Media[];
    addToWishlist: (item: Media) => void;
    removeFromWishlist: (id: number) => void;
}

const useWishlistStore = create<WishlistState>((set) => ({
    wishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
    addToWishlist: (item: Media) => set((state) => {
        const updatedWishlist = [...state.wishlist, item];
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return { wishlist: updatedWishlist };
    }),
    removeFromWishlist: (id: number) => set((state) => {
        const updatedWishlist = state.wishlist.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return { wishlist: updatedWishlist };
    }),
}));

export default useWishlistStore;