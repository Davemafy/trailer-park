import { useVideoPlayer } from "@/hooks/use-video-player";
import ReactPlayer from "react-player";

const VideoPlayer = () => {
  const { activeVideoKey, playingTitle, isModalOpen, handleCloseModal } = useVideoPlayer();

  return (
    <div
      className={`fixed ${isModalOpen ? "flex" : "hidden"} inset-0 z-50 items-center justify-center bg-black/80 p-4 backdrop-blur-sm`}
    >
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        <div className="flex items-center justify-betw[een border-b border-zinc-800/50 bg-zinc-900/50 px-6 py-4">
          <h3 className="truncate text-lg font-medium text-white">
            {playingTitle ? `Now playing: ${playingTitle}` : "Watch Trailer"}
          </h3>
          <button
            onClick={handleCloseModal}
            className="rounded-full bg-zinc-800/50 p-2 px-3 text-base text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
          >
            ✕ Close
          </button>
        </div>
        <div className="relative flex aspect-video w-full items-center justify-center bg-black">
          {isModalOpen && (
            <ReactPlayer
              src={`https://youtube.com/watch?v=${activeVideoKey}`}
              controls
              playing
              height="100%"
              width="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
