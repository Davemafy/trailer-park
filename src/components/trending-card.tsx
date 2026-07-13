import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useRecents } from "@/features/recents/useRecents";
import { useBookmarks } from "@/features/bookmarks/useBookmarks";
import { SmartImg } from "./smart-img";
import type { VideoPlayerContextType } from "@/contexts/video-player-context";

type TrendingCardProps = {
  media: TMDBMovieResponse;
  IMAGE_BASE?: string;
  handleWatchNow: VideoPlayerContextType["handleWatchNow"];
};

function TrendingCard({
  media,
  IMAGE_BASE = "https://image.tmdb.org/t/p/w1280",
  handleWatchNow,
}: TrendingCardProps) {
  const releaseYear = media.release_date ? media.release_date.substring(0, 4) : "2026";
  const { updateRecents } = useRecents();
  const { updateBookmarks } = useBookmarks();

  return (
    <article
      key={media.id}
      onClick={() => updateRecents(media)}
      className="trending-card bg-neutral-0 relative isolate flex h-60 w-100 shrink-0 overflow-clip rounded-xl"
    >
      <div className="mt-auto flex h-full w-full items-end gap-2 bg-linear-0 from-black to-transparent p-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{media.title}</h3>
          <p className="media-overview font-regular mb-3 text-[13px]">{media.overview}</p>
          <p className="media-details text-xs">{releaseYear}</p>
          <div className="media-details mt-1 flex items-center gap-1">
            <img
              className="h-3"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/960px-IMDB_Logo_2016.svg.png?_=20200406194337"
              alt="imdb"
            />
            <p className="text-[11px]">{media.vote_average?.toFixed(1)} rating</p>
          </div>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="mt-auto flex flex-1 items-center justify-end gap-1.5"
        >
          <Button
            onClick={() =>
              handleWatchNow(media.id, media.title ?? "Selected Movie", media.type ?? "movie")
            }
            className="rounded-full bg-[#9f0922a1] p-2 px-4 text-sm transition-colors hover:bg-[#9f0922]"
          >
            Watch now
          </Button>
          <Button
            onClick={() => updateBookmarks(media)}
            className="flex items-center justify-center rounded-full bg-white/9 p-2.5 backdrop-blur-xl hover:bg-white/12"
          >
            <Plus size={17} />
          </Button>
        </div>
      </div>
      <SmartImg
        className="media-banner absolute -z-10 h-full object-cover"
        path={media.backdrop_path}
        fallback={"assets/img/placeholder.jpg"}
        baseUrl={IMAGE_BASE}
        alt={media.title}
      />
    </article>
  );
}

export default TrendingCard;
