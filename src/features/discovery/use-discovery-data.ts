import { useState, useEffect } from "react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../../config/env-config";

export function useDiscoveryData() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // static reference array for genre filters
  const genresList = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 878, name: "Sci-Fi" },
    { id: 9648, name: "Mystery" },
  ];

  useEffect(() => {
    async function fetchDiscoveryResults() {
      setLoading(true);
      try {
        let apiUrl = "";
        
        if (searchQuery.trim().length > 0) {
          // Fetch matching criteria when the user is typing
          apiUrl = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(searchQuery)}`;
        } else if (selectedGenre) {
          // Fall back to discover endpoint when filtering by genre pills
          apiUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`;
        } else {
          // Initial screen fallback baseline data
          apiUrl = `${TMDB_BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`;
        }

        const res = await fetch(apiUrl);
        const data = await res.json();
        
        const filtered = (data.results || []).filter(
          (item: any) => item.poster_path || item.backdrop_path
        );
        
        setResults(filtered);
      } catch (error) {
        console.error("Error discovering content:", error);
      } finally {
        setLoading(false);
      }
    }

    // Small bounce delay timer block to keep your API limits healthy while typing
    const delayTimer = setTimeout(() => {
      fetchDiscoveryResults();
    }, 400);

    return () => clearTimeout(delayTimer);
  }, [searchQuery, selectedGenre]);

  return {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    genresList,
    results,
    loading,
  };
}
