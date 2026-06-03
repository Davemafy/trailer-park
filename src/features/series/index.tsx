import { useMediaDashboard } from "../../hooks/use-media-dashboard";
import MediaGridLayout from "../../components/media-grid-layout";

export default function Series() {
  const seriesData = useMediaDashboard("tv", 18);

  return <MediaGridLayout data={seriesData} titlePrefix="series" />;
}
