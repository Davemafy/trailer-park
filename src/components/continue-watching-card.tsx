import { Play } from "lucide-react";
import { Link } from "react-router";

type ContinueWatchingCardProps = {
  movie: any;
  IMAGE_BASE?: string;
  handleWatchNow: (movieId: string, movieTitle: string) => void;
};

function ContinueWatchingCard({
  movie,
  IMAGE_BASE = "https://image.tmdb.org/t/p/w1280",
  handleWatchNow,
}: ContinueWatchingCardProps) {
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : "";

  return (
    <article className="continue-watching-card bg-neutral-0 relative isolate flex h-50 w-70 shrink-0 overflow-clip rounded-xl">
      <Link
        to={`/movies/${movie.id}`}
        className="mt-auto flex h-full w-full items-end gap-2 bg-linear-0 from-black/90 to-transparent p-6 px-6.5"
      >
        <div className="relative z-10 flex flex-1 cursor-default flex-col gap-2">
          <div>
            <h3 className="max-w-[90%] truncate text-base font-semibold">{movie.title}</h3>
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

      <img
        className="movie-banner absolute -z-1 h-full w-full object-cover object-top"
        src={`${IMAGE_BASE}${movie.backdrop_path}`}
        alt=""
      />
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleWatchNow(movie.id, movie.title);
          }
        }}
        className="absolute inset-0 z-1 grid cursor-pointer place-items-center"
      >
        <button
          onClick={() => handleWatchNow(movie.id, movie.title)}
          className="rounded-full bg-white/15 p-2 backdrop-blur-xs transition"
        >
          <Play size={12} fill="white" />
        </button>
      </div>
    </article>
  );
}

export default ContinueWatchingCard;
