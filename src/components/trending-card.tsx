import { Plus } from "lucide-react";
import { Button } from "./ui/button";

type TrendingCardProps = {
  movie: any;
  IMAGE_BASE?: string;
  handleWatchNow: (movieId: string, movieTitle: string) => void;
};

function TrendingCard({
  movie,
  IMAGE_BASE = "https://image.tmdb.org/t/p/w1280",
  handleWatchNow,
}: TrendingCardProps) {
  const releaseYear = movie.first_air_date ? movie.first_air_date.substring(0, 4) : "2026";

  return (
    <article
      key={movie.id}
      className="trending-card bg-neutral-0 relative isolate flex h-60 w-100 shrink-0 overflow-clip rounded-xl"
    >
      <div className="mt-auto flex h-full w-full items-end gap-2 bg-linear-0 from-black to-transparent p-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{movie.title}</h3>
          <p className="movie-overview font-regular text-[14px]">{movie.overview}</p>
          <p>{releaseYear}</p>
          <div className="mt-1 flex items-center gap-1">
            <img
              className="h-4"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/960px-IMDB_Logo_2016.svg.png?_=20200406194337"
              alt="imdb"
            />
            <p className="text-[13px]">{movie.vote_average?.toFixed(1)} rating</p>
          </div>
        </div>
        <div className="mt-auto flex flex-1 items-center justify-end gap-1.5">
          <Button
            onClick={() => handleWatchNow(movie.id, movie.title)}
            className="rounded-full bg-[#9f0922a1] p-2 px-4 text-sm transition-colors hover:bg-[#9f0922]"
          >
            Watch now
          </Button>
          <Button className="flex items-center justify-center rounded-full bg-white/9 p-2.5 backdrop-blur-xl hover:bg-white/12">
            <Plus size={17} />
          </Button>
        </div>
      </div>
      <img
        className="movie-banner absolute -z-10 h-full object-cover"
        src={`${IMAGE_BASE}${movie.backdrop_path}`}
        alt=""
      />
    </article>
  );
}

export default TrendingCard;
