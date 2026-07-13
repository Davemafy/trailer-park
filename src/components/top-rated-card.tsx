import { Plus, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useRecents } from "@/features/recents/useRecents";
import { SmartImg } from "./smart-img";
import clapboardFallback from "../assets/img/placeholder-image.svg";


type TopRatedCardProps = {
  movie: any;
  IMAGE_BASE?: string;
  className?: string;
  handleWatchNow: (movieId: string, movieTitle: string) => void;
};

function TopRatedCard({
  movie,
  IMAGE_BASE = "https://image.tmdb.org/t/p/w1280",
  handleWatchNow,
  className,
}: TopRatedCardProps) {
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : "";
  const { updateRecents } = useRecents();

  return (
    <article
      onClick={() => updateRecents(movie)}
      className={`top-rated-card bg-neutral-0 relative isolate  flex h-45 overflow-clip rounded-xl hover:shadow-lg ${className ?? ""}`}
    >
      <div className="mt-auto flex w-full flex-col gap-2 bg-linear-0 from-black/90 to-transparent p-4">
        <span className="absolute top-4 flex w-fit items-center gap-1 rounded-2xl bg-[#0c0c0c] p-1 px-2 text-[10.5px]">
          <Star stroke="#ffc729" fill="#ffc729" size={11} />
          {movie.vote_average?.toFixed(1)}
        </span>
        <div className="flex-1">
          <h3 className="truncate text-base font-semibold">{movie.title}</h3>
          <p className="text-[11px]">{releaseYear}</p>
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="mt-auto flex flex-1 items-center justify-between gap-1.5"
        >
          <Button
            onClick={() => handleWatchNow(movie.id, movie.title)}
            className="rounded-full bg-[#9f0922a1] p-2 px-4 text-[10.5px] transition-colors hover:bg-[#9f0922]"
          >
            Watch now
          </Button>
          <Button className="flex items-center justify-center rounded-full bg-white/9 p-2.5 backdrop-blur-xl hover:bg-white/12">
            <Plus size={16} />
          </Button>
        </div>
      </div>
      <SmartImg
        className="movie-banner absolute -z-10 h-full object-cover"
        path={movie.backdrop_path}
        baseUrl={IMAGE_BASE}
        fallback={clapboardFallback}
        alt={movie.title}
      />
    </article>
  );
}

export default TopRatedCard;
