interface TMDBMovieResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: TMDBCollection | null;
  budget: number;
  genres: TMDBGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: TMDBProductionCompany[];
  production_countries: TMDBProductionCountry[];
  release_date: string; // YYYY-MM-DD
  revenue: number;
  runtime: number | null;
  spoken_languages: TMDBSpokenLanguage[];
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  tagline: string | null;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TMDBGenre {
  id: number;
  name: string;
}

interface TMDBCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

interface TMDBProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

