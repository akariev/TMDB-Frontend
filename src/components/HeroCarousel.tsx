import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Slide } from '@/models/Slide';

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const nextSlide = () => {
        console.log("Next slide");
        if (slides && slides.length > 0) {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }
    };

    const prevSlide = () => {
        console.log("Previous slide");
        if (slides && slides.length > 0) {
            setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
        }
    };

    if (!slides || slides.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="relative h-screen">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="relative w-full h-full">
                        <img
                            src={slide.image}
                            alt={slide.title ?? 'Backdrop Image'}
                            className="absolute inset-0 object-cover w-full h-full"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50" />
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                        <p className="text-xl mb-4">{slide.description}</p>
                        <div className="flex space-x-4">
                            <button className="bg-white text-black px-6 py-2 rounded-md flex items-center z-10 cursor-pointer" onClick={() => navigate(`/movie/${slide.id}`)}>
                                <Play className="mr-2" /> Watch Now
                            </button>
                            <button className="bg-gray-800 text-white px-6 py-2 rounded-md flex items-center z-10 cursor-pointer" onClick={() => navigate(`/movie/${slide.id}`)}>
                                <Info className="mr-2" /> More Info
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 cursor-pointer"
            >
                <ChevronLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 cursor-pointer"
            >
                <ChevronRight />
            </button>
        </div>
    );
}