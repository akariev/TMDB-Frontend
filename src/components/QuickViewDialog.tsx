import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Media } from '../models/Media';
import { Movie } from '@/models/Movie';

interface QuickViewDialogProps {
    showModal: boolean;
    setShowModal: (open: boolean) => void;
    selectedMovie?: Media;
}

const isMovie = (item: Media): item is Movie => 'release_date' in item;

export default function QuickViewDialog({ showModal, setShowModal, selectedMovie }: QuickViewDialogProps) {
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{selectedMovie && isMovie(selectedMovie) ? selectedMovie.title : selectedMovie?.name}</DialogTitle>
                </DialogHeader>
                {selectedMovie && (
                    <div className="flex gap-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            alt={isMovie(selectedMovie) ? selectedMovie.title : selectedMovie.name}
                            className="w-2/5 rounded-lg"
                        />
                        <div className="w-3/5">
                            {isMovie(selectedMovie) ? (
                                <>
                                    <p className="mb-2">Year: {new Date(selectedMovie.release_date).getFullYear()}</p>
                                    <p className="mb-2">Rating: {selectedMovie.vote_average.toFixed(1)}</p>
                                </>
                            ) : (
                                <>
                                    <p className="mb-2">Year: {new Date(selectedMovie.first_air_date).getFullYear()}</p>
                                </>
                            )}
                            <p className="mb-4">{selectedMovie.overview}</p>
                            <Link to={`/movie/${selectedMovie.id}`}>
                                <Button>See Full Details</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}