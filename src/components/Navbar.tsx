
import { Bell, ChevronDown, Globe, Menu, Moon, Search, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const API_URL = import.meta.env.API_URL as string;
export default function Navbar() {
    interface Genre {
        id: number;
        name: string;
    }

    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);


    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await fetch(`${API_URL}api/Genres/genres`);
                const data = await response.json();
                setMovieGenres([...data.movieGenres, ...data.tvGenres]);
            } catch (error) {
                console.error('Failed to fetch genres:', error);
            }
        }
        fetchGenres();
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-white text-2xl font-bold">MovieStream</Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                                <div className="relative group">
                                    <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
                                        Genres
                                        <ChevronDown className="ml-1 h-4 w-4" />
                                    </button>
                                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            {movieGenres.map((genre) => (
                                                <Link key={genre.id} to={`/genre/${genre.id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                                    {genre.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Link to="/wishlist" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Wishlist</Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <Search className="h-6 w-6" />
                            </button>
                            <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <Bell className="h-6 w-6" />
                            </button>
                            <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <Globe className="h-6 w-6" />
                            </button>
                            <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <Moon className="h-6 w-6" />
                            </button>
                            <div className="ml-3 relative">
                                <div>
                                    <button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-expanded="false" aria-haspopup="true">
                                        <span className="sr-only">Open user menu</span>
                                        <User className="h-8 w-8 rounded-full" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <Menu className="block h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}