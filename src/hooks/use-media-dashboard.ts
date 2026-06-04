import { useState, useEffect } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config/env-config";

export interface TMDBMovieResponse {
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

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDBProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface TMDBProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}


export function useMediaDashboard(mediaType: "movie" | "tv", genreId?: number) {
  const [trending, setTrending] = useState<TMDBMovieResponse[]>([]);
  const [popular, setPopular] = useState<TMDBMovieResponse[]>([]);
  const [topRated, setTopRated] = useState<TMDBMovieResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const [playingTitle, setPlayingTitle] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchDashboardContent() {
      setLoading(true);
      try {
        let trendingUrl = `${TMDB_BASE_URL}/trending/${mediaType}/week?api_key=${TMDB_API_KEY}`;
        let popularUrl = `${TMDB_BASE_URL}/${mediaType}/popular?api_key=${TMDB_API_KEY}`;
        let topRatedUrl = `${TMDB_BASE_URL}/${mediaType}/top_rated?api_key=${TMDB_API_KEY}`;

        if (genreId) {
          trendingUrl = `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=trending.desc`;
          popularUrl = `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`;
          topRatedUrl = `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=vote_average.desc`;
        }

        const [trendingRes, popularRes, topRes] = await Promise.all([
          fetch(trendingUrl),
          fetch(popularUrl),
          fetch(topRatedUrl),
        ]);

        const trendingData = await trendingRes.json();
        const popularData = await popularRes.json();
        const topData = await topRes.json();

        const normalize = (items: TMDBMovieResponse[]) =>
          (items || []).map((item) => ({
            ...item,
            title: item.title || item.name,
          }));

        setTrending(normalize(trendingData.results));
        setPopular(normalize(popularData.results));
        setTopRated(normalize(topData.results));
      } catch (error) {
        console.error(`Error fetching ${mediaType} data:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardContent();
  }, [mediaType, genreId]);

  const handleWatchNow = async (mediaId: number, mediaTitle: string) => {
    setIsModalOpen(true);
    try {
      const videoUrl = `${TMDB_BASE_URL}/${mediaType}/${mediaId}/videos?api_key=${TMDB_API_KEY}`;
      const res = await fetch(videoUrl);
      const data = await res.json();

      const trailer = data.results?.find(
        (vid: any) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
      );

      if (trailer) {
        setActiveVideoKey(trailer.key);
        setPlayingTitle(mediaTitle);
      } else {
        alert("Trailer preview not available for this title.");
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error fetching video metadata:", err);
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPlayingTitle(null);
    setActiveVideoKey(null);
  };

  console.log(trending)

  return {
    trending,
    popular,
    topRated,
    loading,
    activeVideoKey,
    playingTitle,
    isModalOpen,
    handleWatchNow,
    handleCloseModal,
  };

}
