import { useCustomMovies } from "@/hooks/use-custom-movies";
import { useMediaDashboard } from "../../hooks/use-media-dashboard";
import MediaGridLayout from "@/components/media-grid-layout";

export default function Movies() {
  const moviesData = useMediaDashboard("movie");
  const { customMovies } = useCustomMovies();

  const data = {
    ...moviesData,
    trending: [
      ...(customMovies
        ? customMovies.filter((movie) => movie.category === "trending").reverse()
        : []),
      ...moviesData.trending,
    ],
    topRated: [
      ...(customMovies
      ? customMovies.filter((movie) => movie.category === "top-rated").reverse()
        : []),
      ...moviesData.trending,
    ],
  };


  return <MediaGridLayout data={data} titlePrefix="movies" />;
}
