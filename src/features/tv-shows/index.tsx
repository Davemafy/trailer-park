import { useMediaDashboard } from "../../hooks/use-media-dashboard";
import MediaGridLayout from "../../components/media-grid-layout";

export default function TvShows() {
  const tvData = useMediaDashboard("tv", 10764);

  return <MediaGridLayout data={tvData} titlePrefix="TV Shows" />;
}
