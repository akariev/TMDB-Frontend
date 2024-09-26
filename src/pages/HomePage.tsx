import Footer from '@/components/Footer';
import GenreSection from '@/components/GenreSection';
import HeroCarousel from '@/components/HeroCarousel';
import Navbar from '@/components/Navbar';
import { Movie } from '@/models/Movie';
import { Slide } from '@/models/Slide';
import { TVShow } from '@/models/TVShow';
import { useEffect, useState } from 'react';

interface Genre {
    id: string;
    name: string;
}

interface Root {
    movieGenres: Genre[];
    tvGenres: Genre[];
    trendingMovies: Movie[];
    trendingTVShows: TVShow[];
    moviesByGenre: { genreId: string; results: { total_results: number; results: Movie[] } }[];
    tvShowsByGenre: { genreId: string; results: { total_results: number; results: TVShow[] } }[];
}

interface CombinedGenre {
    id: string;
    name: string;
    totalResults: number;
}

const API_URL = process.env.API_URL as string + 'api/home';

export default function HomePage() {
    console.log('API URL:', API_URL);
    const [genres, setGenres] = useState<CombinedGenre[]>([]);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const [mediaItems, setMediaItems] = useState<(Movie | TVShow)[]>([]);
    const [allMediaByGenre, setAllMediaByGenre] = useState<{ [key: string]: (Movie | TVShow)[] }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Root = await response.json();
                const { trendingMovies, trendingTVShows, movieGenres, tvGenres, moviesByGenre, tvShowsByGenre } = data;

                const combinedSlides = [
                    ...trendingMovies.slice(0, 3).map(createSlide),
                    ...trendingTVShows.slice(0, 3).map(createSlide)
                ];

                const combinedMediaByGenre = combineMediaByGenre(moviesByGenre, tvShowsByGenre);
                const combinedGenres = [...movieGenres, ...tvGenres].map(genre => ({
                    ...genre,
                    totalResults: combinedMediaByGenre[genre.id]?.totalResults || 0
                }));
                const uniqueGenres = Array.from(
                    new Map(combinedGenres.map(item => [item.id, item])).values()
                );

                console.log('Unique genres with total results:', uniqueGenres);
                console.log('Combined slides:', combinedSlides);

                setSlides(combinedSlides);
                setGenres(uniqueGenres);
                setSelectedGenre(uniqueGenres[0]?.id);
                const mediaByGenre = Object.fromEntries(
                    Object.entries(combinedMediaByGenre).map(([key, value]) => [key, value.media])
                );
                setAllMediaByGenre(mediaByGenre);
                setMediaItems(combinedMediaByGenre[uniqueGenres[0]?.id]?.media || []);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedGenre && allMediaByGenre[selectedGenre]) {
            setMediaItems(allMediaByGenre[selectedGenre]);
        }
    }, [selectedGenre, allMediaByGenre]);

    const createSlide = (item: Movie | TVShow): Slide => ({
        id: item.id.toString(),
        title: 'title' in item ? item.title : item.name,
        description: item.overview,
        image: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
    });

    const combineMediaByGenre = (moviesByGenre: Root['moviesByGenre'], tvShowsByGenre: Root['tvShowsByGenre']) => {
        const combined: { [key: string]: { media: (Movie | TVShow)[], totalResults: number } } = {};

        moviesByGenre.forEach(({ genreId, results }) => {
            combined[genreId] = {
                media: results.results,
                totalResults: results.total_results,
            };
        });

        tvShowsByGenre.forEach(({ genreId, results }) => {
            if (combined[genreId]) {
                combined[genreId].media = [...combined[genreId].media, ...results.results];
                combined[genreId].totalResults += results.total_results;
            } else {
                combined[genreId] = {
                    media: results.results,
                    totalResults: results.total_results,
                };
            }
        });

        console.log('Combined media by genre with total results:', combined);
        return combined;
    };

    return (
        <>
            <Navbar />
            {slides.length > 0 && <HeroCarousel slides={slides} />}
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="relative container mx-auto px-4 py-8">
                    <GenreSection
                        genres={genres}
                        selectedGenre={selectedGenre}
                        setSelectedGenre={setSelectedGenre}
                        mediaItems={mediaItems}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}