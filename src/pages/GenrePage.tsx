import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Movie } from '@/models/Movie';
import { ChevronUp, Film, Tv } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Genre {
    id: number;
    name: string;
}

const API_URL = process.env.API_URL as string;

export default function GenrePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isTVShowMode, setIsTVShowMode] = useState(false);
    const [mediaType, setMediaType] = useState<'movies' | 'tvshows'>('movies');
    const [genres, setGenres] = useState<Genre[]>([]);
    const { genreId } = useParams();

    const fetchGenres = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}api/Genres/genres`);
            if (!response.ok) throw new Error('Failed to fetch genres');
            const data = await response.json();
            setGenres([...data.movieGenres, ...data.tvGenres]);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }, []);

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    const fetchContent = useCallback(async () => {
        try {
            let url = isTVShowMode
                ? `${API_URL}api/Genres/${genreId}/tvshows?page=${currentPage}`
                : `${API_URL}/api/Genres/${genreId}/movies?page=${currentPage}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }, [genreId, currentPage, isTVShowMode]);

    useEffect(() => {
        if (genres.length > 0) fetchContent();
    }, [fetchContent, genres]);

    useEffect(() => {
        setIsTVShowMode(mediaType === 'tvshows');
    }, [mediaType]);

    const getGenreNameById = useMemo(
        () => (id: string | undefined): string => {
            if (!id) return 'Unknown Genre';
            const genreObj = genres.find((g: Genre) => g.id === Number(id));
            return genreObj ? genreObj.name : 'Unknown Genre';
        },
        [genres]
    );

    const currentGenreName = getGenreNameById(genreId);

    if (!movies) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (<>
        <Navbar />
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-gray-800 to-gray-400 py-12 px-4 md:px-6">
                <div className="container mx-auto pt-5">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{currentGenreName} {(isTVShowMode ? 'TV Shows' : 'Movies')}</h1>
                    <p className="text-xl mb-4">Explore {totalResults} {(currentGenreName ?? 'Unknown').toLowerCase()} {(isTVShowMode ? 'tv shows' : 'films')}</p>
                </div>
            </header>

            {/* Filter and Sort Options */}
            <div className="sticky top-0 bg-gray-800 z-10 py-4 px-4 md:px-6 shadow-md">
                <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
                    <RadioGroup
                        defaultValue="movies"
                        value={mediaType}
                        onValueChange={(value) => {
                            setMediaType(value as 'movies' | 'tvshows');
                            setIsTVShowMode(value === 'tvshows');
                        }}
                        className="flex items-center space-x-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="movies" id="movies" />
                            <Label htmlFor="movies" className="flex items-center cursor-pointer">
                                <Film className="w-4 h-4 mr-1" /> Movies
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tvshows" id="tvshows" />
                            <Label htmlFor="tvshows" className="flex items-center cursor-pointer">
                                <Tv className="w-4 h-4 mr-1" /> TV Shows
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>


            {/* Main Content Grid */}
            <main className="container mx-auto py-8 px-4 md:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} mediaItem={movie} />
                    ))}
                </div>
            </main>

            {/* Pagination */}
            <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

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
    )
}