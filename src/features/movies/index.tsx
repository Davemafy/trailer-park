import { useMediaDashboard } from "../../hooks/use-media-dashboard";
import MediaGridLayout from "@/components/media-grid-layout";

export default function Movies() {
  const moviesData = useMediaDashboard("movie");

  return <MediaGridLayout data={moviesData} titlePrefix="movie" />;
}
