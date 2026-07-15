import { Plus, Star, Clock, Calendar, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

import clapboardFallback from "../assets/img/placeholder-image.svg";
import avatarPlaceholder from "../assets/img/avatar-placeholder.png";

import { SmartImg } from "@/components/smart-img";

type PreviewMovieProps = {
  previewing: boolean;
  movie: TMDBMovieResponse;
};

function PreviewMovie({ previewing, movie }: PreviewMovieProps) {
  const handleWatchNow = () => {};

  return (
    <div
      className={`animate-fade-in h-full w-full scrollbar-none overflow-y-auto pt-4 pb-12 transition-all duration-500 ease-in-out ${
        previewing ? "max-w-full opacity-100 sm:max-w-[50%]" : "max-w-0 overflow-hidden opacity-0"
      }`}
    >
      {/* Cinematic Banner */}
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-[#151517]">
        <SmartImg
          path={movie.backdrop_path}
          fallback={clapboardFallback}
          alt={movie.title}
          className="h-full w-full object-cover object-top"
        />

        {/* Dark Gradient Mask*/}
        <div className="absolute inset-0 bg-linear-to-t from-[#0d0c0f] via-[#0d0c0f]/40 to-transparent" />

        {/* Floating Content */}
        <div className="absolute right-0 bottom-0 left-0 flex flex-col items-start gap-3 p-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded border border-zinc-800 bg-[#1c1a22] px-2 py-0.5 text-xs font-medium text-amber-400">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <a href="#movie-rating">{isNaN(movie.vote_average) ? "0.0" : movie.vote_average.toFixed(1)}</a>
            </span>
            {movie.adult && (
              <span className="rounded border border-red-800/50 bg-red-900/40 px-1.5 py-0.5 text-[10px] font-bold text-red-400 uppercase">
                R-18
              </span>
            )}
          </div>

          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            <a href="#movie-name">{movie.title}</a>
          </h1>

          {/* Action Triggers */}
          <div className="mt-1 flex items-center gap-3">
            <Button
              onClick={() => handleWatchNow()}
              className="rounded-full bg-[#9f0922a1] p-2 px-4 text-sm transition-colors hover:bg-[#9f0922]"
            >
              Watch now
            </Button>
            <Button className="flex items-center justify-center rounded-full bg-white/9 p-2.5 backdrop-blur-xl hover:bg-white/12">
              <Plus size={17} />
            </Button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side Content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-zinc-400">Synopsis</h2>
            <p className="text-sm leading-relaxed text-[#969899]">
              <a href="#movie-description">
                {movie.overview || "No data descriptions recorded for this title listing."}
              </a>
            </p>
          </div>

          {/* Actor Profile Scroller Strip */}
          {movie.credits?.cast && movie.credits.cast.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-zinc-400">Top Cast</h2>
              <div className="flex scrollbar-none gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {movie.credits.cast.slice(0, 6).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex max-w-[75px] min-w-[75px] flex-col items-center text-center"
                  >
                    <SmartImg
                      path={actor.profile_path}
                      fallback={avatarPlaceholder}
                      alt={actor.name || "Actor Profile"}
                      className="mb-1.5 h-12 w-12 rounded-full border border-zinc-800 object-cover"
                    />

                    <span className="w-full truncate text-xs font-medium text-white">
                      {actor.name || "actor"}
                    </span>
                    <span className="w-full truncate text-[10px] text-zinc-500">
                      {actor.character || "Chacter"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Info Data Sidebar block Panel */}
        <div className="flex h-fit flex-col gap-3.5 rounded-xl border border-[#151517] bg-[#121115] p-4">
          <div className="flex items-center gap-3 text-xs text-[#969899]">
            <Calendar size={14} className="text-zinc-500" />
            <div>
              <span className="block text-[10px] font-semibold text-zinc-500 uppercase">
                Release Date
              </span>
              <span className="font-medium text-zinc-200">{movie.release_date || "Unknown"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#969899]">
            <Clock size={14} className="text-zinc-500" />
            <div>
              <span className="block text-[10px] font-semibold text-zinc-500 uppercase">
                Runtime
              </span>
              <span className="font-medium text-zinc-200">
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#969899]">
            <Globe size={14} className="text-zinc-500" />
            <div>
              <span className="block text-[10px] font-semibold text-zinc-500 uppercase">
                Genres
              </span>
              <div className="mt-1 flex flex-wrap gap-1">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="text-2xs rounded border border-zinc-800 bg-[#1c1a22] px-2 py-0.5 text-zinc-300"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewMovie;
