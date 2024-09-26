import { Button } from '@/components/ui/button';
import MovieCard from '@/components/MovieCard';
import { ChevronRight } from 'lucide-react';
import { Media } from '@/models/Media';
import { useNavigate } from 'react-router-dom';

interface Genre {
    id: string;
    name: string;
    totalResults: number;
}

interface GenreSectionProps {
    genres: Genre[];
    selectedGenre: string | null;
    setSelectedGenre: (genreId: string) => void;
    mediaItems: Media[];
}

const GenreSection = ({ genres, selectedGenre, setSelectedGenre, mediaItems }: GenreSectionProps) => {
    const navigate = useNavigate();

    return (
        <section className="mb-12">
            <nav className="mb-8">
                <ul className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {genres.map((genre) => (
                        <li key={genre.id}>
                            <Button
                                variant={selectedGenre === genre.id ? "default" : "outline"}
                                onClick={() => setSelectedGenre(genre.id)}
                                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-100"
                            >
                                <span>{genre.name}</span>
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-100">
                    {genres.find(g => g.id === selectedGenre)?.name || 'Selected'} Genre
                    <span className="ml-2 text-sm bg-gray-700 px-2 py-1 rounded-full">
                        {genres.find(g => g.id === selectedGenre)?.totalResults.toLocaleString() || '0'}
                    </span>
                </h2>
                <Button
                    variant="link"
                    className="flex items-center text-gray-300 hover:text-gray-100"
                    onClick={() => navigate(`/genre/${selectedGenre}`)}
                >
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 bg-red">
                {mediaItems.map((item: Media) => (
                    <MovieCard
                        key={item.id}
                        mediaItem={item}
                    />
                ))}
            </div>
        </section>
    );
};

export default GenreSection;