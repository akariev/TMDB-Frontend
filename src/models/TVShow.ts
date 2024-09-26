
export interface TVShow {
    origin_country: string[];
    original_name: string;
    first_air_date: string;
    name: string;
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path?: string | null;
}
