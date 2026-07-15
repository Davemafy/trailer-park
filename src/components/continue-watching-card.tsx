import { useRecents } from "@/features/recents/useRecents";
import { Play } from "lucide-react";
import { Link } from "react-router";
import { SmartImg } from "./smart-img";
import type { VideoPlayerContextType } from "@/contexts/video-player-context";
import clapboardFallback from "../assets/img/placeholder-image.svg";


type ContinueWatchingCardProps = {
  media: TMDBMovieResponse;
  IMAGE_BASE?: string;
  handleWatchNow: VideoPlayerContextType["handleWatchNow"];
};

function ContinueWatchingCard({
  media,
  IMAGE_BASE = "https://image.tmdb.org/t/p/w1280",
  handleWatchNow,
}: ContinueWatchingCardProps) {
  const releaseYear = media.release_date ? media.release_date.substring(0, 4) : "";
  const { updateRecents } = useRecents();

  return (
    <article
      onClick={() => updateRecents(media)}
      className="continue-watching-card bg-neutral-0 relative isolate flex h-50 w-70 shrink-0 overflow-clip rounded-xl"
    >
      <Link
        to={`/medias/${media.id}`}
        className="mt-auto flex h-full w-full items-end gap-2 bg-linear-0 from-black/90 to-transparent p-6 px-6.5"
      >
        <div className="relative z-10 flex flex-1 cursor-default flex-col gap-2">
          <div>
            <h3 className="max-w-[90%] truncate text-base font-semibold">{media.title}</h3>
            <p className="text-[11px]">{releaseYear}</p>
          </div>
          <div className="flex items-center gap-1.5 text-[9px]">
            <span>42:31</span>
            <div className="h-1 w-full rounded-2xl bg-white/9">
              <div className="relative h-1 w-20 rounded-2xl bg-white">
                <span className="absolute -top-0.5 right-0 h-2 w-2 rounded-2xl bg-white"></span>
              </div>
            </div>
            <span>1:20:06</span>
          </div>
        </div>
      </Link>

      <SmartImg
        className="media-banner absolute -z-1 h-full w-full object-cover object-top"
        path={media.backdrop_path}
        fallback={clapboardFallback}
        baseUrl={IMAGE_BASE}
        alt={media.title}
      />
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleWatchNow(media.id, media.title ?? "Selected Movie", media.type ?? "movie");
          }
        }}
        className="absolute inset-0 z-1 grid cursor-pointer place-items-center"
      >
        <button
          onClick={() =>
            handleWatchNow(media.id, media.title ?? "Selected Movie", media.type ?? "movie")
          }
          className="rounded-full bg-white/15 p-2 backdrop-blur-xs transition"
        >
          <Play size={12} fill="white" />
        </button>
      </div>
    </article>
  );
}

export default ContinueWatchingCard;
