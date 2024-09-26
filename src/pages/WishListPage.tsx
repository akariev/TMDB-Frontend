import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import useWishlistStore from '@/stores/useWishListStore';
import { ChevronUp } from 'lucide-react';
import { useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 20;

export default function WishlistPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const { wishlist } = useWishlistStore();

    const paginatedWishlist = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return wishlist.slice(startIndex, endIndex);
    }, [wishlist, currentPage]);

    const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Header Section */}
                <header className="bg-gradient-to-r from-gray-800 to-gray-400 py-12 px-4 md:px-6">
                    <div className="container mx-auto pt-5">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">Your Wishlist</h1>
                        <p className="text-xl mb-4">Explore {wishlist.length} items in your wishlist</p>
                    </div>
                </header>

                {/* Main Content Grid */}
                <main className="container mx-auto py-8 px-4 md:px-6">
                    {wishlist.length === 0 ? (
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
                            <p>Start adding movies and TV shows to your wishlist!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {paginatedWishlist.map((item) => (
                                <MovieCard key={item.id} mediaItem={item} />
                            ))}
                        </div>
                    )}
                </main>

                {/* Pagination */}
                {wishlist.length > ITEMS_PER_PAGE && (
                    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                )}

                {/* Back to Top Button */}
                <Button
                    className="fixed bottom-4 right-4 rounded-full p-2 bg-white text-gray-900 shadow-md"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <ChevronUp className="h-6 w-6" />
                </Button>
            </div>
            <Footer />
        </>
    );
}