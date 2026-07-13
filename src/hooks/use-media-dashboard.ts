import { useState, useEffect } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config/env-config";



export function useMediaDashboard(mediaType: "movie" | "tv", genreId?: number): MediaDashboardType {
  const [trending, setTrending] = useState<TMDBMovieResponse[]>([]);
  const [popular, setPopular] = useState<TMDBMovieResponse[]>([]);
  const [topRated, setTopRated] = useState<TMDBMovieResponse[]>([]);
  const [loading, setLoading] = useState(true);


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
            type: mediaType,
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


  return {
    trending,
    popular,
    topRated,
    loading,
  };

}
