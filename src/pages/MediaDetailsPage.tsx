import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarIcon, FilmIcon, UserIcon, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MovieDetails {
    original_title: string;
    release_date: string;
    title: string;
    backdrop_path: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    credits: Credits;
}

interface Credits {
    cast: Cast[];
    crew: Crew[];
}

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}

interface Crew {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string;
}

const API_URL = process.env.API_URL as string
const MediaDetailsPage: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`${API_URL}api/Movies/${movieId}`);
                const data = await response.json();
                console.log('Movie details:', data);
                setMovieDetails(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (!movieDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const directors = movieDetails.credits.crew.filter(c => c.job.toLowerCase() === "director");

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            <Navbar />
            <main className="flex-grow">
                <div className="relative h-96 overflow-hidden">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                        alt={`${movieDetails.title} backdrop`}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h1 className="text-5xl font-bold text-white mb-4">{movieDetails.title}</h1>
                        <div className="flex items-center text-gray-300 space-x-6">
                            <span className="flex items-center">
                                <CalendarIcon className="w-6 h-6 mr-2" />
                                {new Date(movieDetails.release_date).getFullYear()}
                            </span>
                            <span className="flex items-center">
                                <StarIcon className="w-6 h-6 mr-2 text-yellow-400" />
                                {movieDetails.vote_average.toFixed(1)}
                            </span>
                            <Badge variant="secondary" className="text-lg px-3 py-1">
                                {movieDetails.original_title !== movieDetails.title ? movieDetails.original_title : "Original Title"}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <Card className="overflow-hidden shadow-lg">
                                <CardContent className="p-0">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                                        alt={`${movieDetails.title} poster`}
                                        className="w-full h-auto"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-2">
                            <Card className="bg-gray-800 text-white shadow-xl">
                                <CardContent className="p-8">
                                    <h2 className="text-3xl font-semibold mb-6">Overview</h2>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8">{movieDetails.overview}</p>
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-4 flex items-center">
                                                <UserIcon className="w-6 h-6 mr-3" />
                                                Cast
                                            </h3>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {movieDetails.credits.cast.slice(0, 6).map((actor) => (
                                                    <div key={actor.id} className="flex items-center space-x-3">
                                                        {actor.profile_path ? (
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
                                                                alt={actor.name}
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                                                <span className="text-sm font-semibold">{actor.name.charAt(0)}</span>
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-semibold">{actor.name}</p>
                                                            <p className="text-sm text-gray-400">{actor.character}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold mb-4 flex items-center">
                                                <FilmIcon className="w-6 h-6 mr-3" />
                                                Directors
                                            </h3>
                                            <div className="flex flex-wrap gap-4">
                                                {directors.map((director) => (
                                                    <div key={director.id} className="flex items-center space-x-3">
                                                        {director.profile_path ? (
                                                            <img
                                                                src={`https://image.tmdb.org/t/p/w92${director.profile_path}`}
                                                                alt={director.name}
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                                                                <span className="text-sm font-semibold">{director.name.charAt(0)}</span>
                                                            </div>
                                                        )}
                                                        <p className="font-semibold">{director.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default MediaDetailsPage;