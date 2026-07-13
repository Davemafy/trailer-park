import { useContext } from "react"
import { VideoPlayerContext } from "../contexts/video-player-context"

export const useVideoPlayer = () => {
  const context = useContext(VideoPlayerContext)
  if (context === null) {
    throw new Error("useVideoPlayer must be used within a VideoPlayerProvider")
  }

  return context
}