import { createContext } from "react";

export interface VideoPlayerContextType {
  activeVideoKey: string | null;
  setActiveVideoKey: React.Dispatch<React.SetStateAction<string | null>>;
  playingTitle: string | null;
  setPlayingTitle: React.Dispatch<React.SetStateAction<string | null>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseModal: () => void;
  handleWatchNow: (
    mediaId: number,
    mediaTitle: string,
    mediaType?: "movie" | "tv"
) => Promise<void>;
}

export const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);
