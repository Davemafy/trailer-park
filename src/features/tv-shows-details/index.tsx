import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Plus, Star, ArrowLeft, Clock, Calendar, Globe } from "lucide-react";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../../config/env-config";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";

interface TvDetailData {
  id: number;
  name: string;
  original_name: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: { id: number; name: string }[];
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string }[];
  };
}

export default function TvDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [show, setShow] = useState<TvDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const [playingTitle, setPlayingTitle] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWatchNow = async (mediaId: number, mediaTitle: string) => {
    setIsModalOpen(true);
    try {
      const videoUrl = `${TMDB_BASE_URL}/tv/${mediaId}/videos?api_key=${TMDB_API_KEY}`;
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
  

  useEffect(() => {
    async function fetchTvDetails() {
      setLoading(true);
      try {
        const url = `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits`;
        const res = await fetch(url);
        const data = await res.json();
        setShow(data);
      } catch (error) {
        console.error("Error retrieving TV show details layout content:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTvDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[75vh] w-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />
      </div>
    );
  }

  if (!show) {
    return (
      <div className="flex h-[75vh] w-full flex-col items-center justify-center gap-3 text-zinc-500">
        <p>TV Show details could not be found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-xs text-zinc-400 underline hover:text-white"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in w-full pt-3 pb-12">
      {/* Sticky Top Back Button Layer */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 text-xs font-semibold text-[#969899] transition-colors hover:text-white"
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/50 bg-zinc-900/50 px-6 py-4">
              <h3 className="truncate text-lg font-medium text-white">
                {playingTitle ? `Now playing: ${playingTitle}` : "Watch Trailer"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="rounded-full bg-zinc-800/50 p-2 px-3 text-sm text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative flex aspect-video w-full items-center justify-center bg-black">
              <ReactPlayer
                src={`https://youtube.com/watch?v=${activeVideoKey}`}
                controls
                playing
                height="100%"
                width="100%"
              />
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Banner Canvas Area */}
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-[#151517]">
        <img
          src={show.backdrop_path ? `${IMAGE_BASE_URL}${show.backdrop_path}` : "/placeholder.jpg"}
          alt={show.name}
          className="h-full w-full object-cover object-top"
        />
        {/* Dark Gradient Mask for text clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0f] via-[#0d0c0f]/40 to-transparent" />

        {/* Floating Content Overlays */}
        <div className="absolute right-0 bottom-0 left-0 flex flex-col items-start gap-3 p-6">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded border border-zinc-800 bg-[#1c1a22] px-2 py-0.5 text-xs font-medium text-amber-400">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {show.vote_average?.toFixed(1)}
            </span>
            <span className="text-2xs rounded bg-zinc-800/60 px-2 py-0.5 font-semibold tracking-wider text-zinc-300 uppercase">
              TV SHOW
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">{show.name}</h1>

          {/* Action Triggers Grid Block Row */}
          <div className="mt-1 flex items-center gap-3">
            <Button
              onClick={() => handleWatchNow(show.id, show.name)}
              className="rounded-full bg-[#9f0922a1] p-2 px-4 text-sm transition-colors hover:bg-[#9f0922]"
            >
              Watch Season 1
            </Button>
            <Button className="flex items-center justify-center rounded-full bg-white/9 p-2.5 backdrop-blur-xl hover:bg-white/12">
              <Plus size={17} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side Container */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div>
            <h2 className="mb-2 text-sm font-semibold text-zinc-400">Synopsis</h2>
            <p className="text-sm leading-relaxed text-[#969899]">
              {show.overview || "No data descriptions recorded for this series."}
            </p>
          </div>

          {/* Cast Actors */}
          {show.credits?.cast && show.credits.cast.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-zinc-400">Top Cast</h2>
              <div className="flex scrollbar-none gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {show.credits.cast.slice(0, 6).map((actor) => (
                  <div
                    key={actor.id}
                    className="flex max-w-[75px] min-w-[75px] flex-col items-center text-center"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `${IMAGE_BASE_URL}${actor.profile_path}`
                          : "/avatar-placeholder.png"
                      }
                      alt={actor.name}
                      className="mb-1.5 h-12 w-12 rounded-full border border-zinc-800 object-cover"
                    />
                    <span className="w-full truncate text-xs font-medium text-white">
                      {actor.name}
                    </span>
                    <span className="w-full truncate text-[10px] text-zinc-500">
                      {actor.character}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Data Sidebar Panel */}
        <div className="flex h-fit flex-col gap-3.5 rounded-xl border border-[#151517] bg-[#121115] p-4">
          <div className="flex items-center gap-3 text-xs text-[#969899]">
            <Calendar size={14} className="text-zinc-500" />
            <div>
              <span className="block text-[10px] font-semibold text-zinc-500 uppercase">
                First Air Date
              </span>
              <span className="font-medium text-zinc-200">{show.first_air_date || "Unknown"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#969899]">
            <Clock size={14} className="text-zinc-500" />
            <div>
              <span className="block text-[10px] font-semibold text-zinc-500 uppercase">
                Seasons & Episodes
              </span>
              <span className="font-medium text-zinc-200">
                {show.number_of_seasons} Seasons ({show.number_of_episodes} Episodes)
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
                {show.genres?.map((g) => (
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
