import QuickViewDialog from '@/components/QuickViewDialog';
import { Button } from '@/components/ui/button';
import { Movie } from '@/models/Movie';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { Media } from '../models/Media';
import useWishlistStore from '@/stores/useWishListStore';


interface MovieCardProps {
    mediaItem: Media;
}

function MovieCard({ mediaItem }: MovieCardProps) {
    const [showModal, setShowModal] = useState(false);
    const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

    const isMovie = (item: Media): item is Movie => 'release_date' in item;
    const inWishlist = wishlist.some(item => item.id === mediaItem.id);

    const toggleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(mediaItem.id);
        } else {
            addToWishlist(mediaItem);
        }
    };

    return (
        <div className="relative group">
            <img
                src={`https://image.tmdb.org/t/p/w500${mediaItem.poster_path}`}
                alt={isMovie(mediaItem) ? mediaItem.title : mediaItem.name}
                className="w-full h-auto rounded-lg shadow-lg transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-1">
                    {isMovie(mediaItem) ? mediaItem.title : mediaItem.name}
                </h3>
                <p className="text-sm mb-2">
                    {isMovie(mediaItem)
                        ? new Date(mediaItem.release_date).getFullYear()
                        : new Date(mediaItem.first_air_date).getFullYear()}
                </p>
                <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {isMovie(mediaItem) && (
                        <span>{mediaItem.vote_average.toFixed(1)}</span>
                    )}
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowModal(true)}
                >
                    Quick View
                </Button>
                <Button
                    variant={inWishlist ? 'default' : 'secondary'}
                    size="sm"
                    onClick={toggleWishlist}
                    className="mt-2"
                >
                    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
            </div>

            <QuickViewDialog
                showModal={showModal}
                setShowModal={setShowModal}
                selectedMovie={mediaItem}
            />
        </div>
    );
}

export default MovieCard;