import { useMemo, useState, type PropsWithChildren } from "react";
import { VideoPlayerContext } from "./video-player-context";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../../config/env-config";

export const VideoPlayerProvider = ({ children }: PropsWithChildren) => {
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const [playingTitle, setPlayingTitle] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleWatchNow = async (mediaId: number, mediaTitle: string ,  mediaType?: "movie" | "tv") => {
      setIsModalOpen(true);
      try {
        const videoUrl = `${TMDB_BASE_URL}/${mediaType??"movie"}/${mediaId}/videos?api_key=${TMDB_API_KEY}`;
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

  const providerValue = useMemo(
    () => ({
      activeVideoKey,
      setActiveVideoKey,
      playingTitle,
      setPlayingTitle,
      isModalOpen,
      setIsModalOpen,
      handleCloseModal,
      handleWatchNow
    }),
    [activeVideoKey]
  );

  return (
    <VideoPlayerContext.Provider value={providerValue}>{children}</VideoPlayerContext.Provider>
  );
};
