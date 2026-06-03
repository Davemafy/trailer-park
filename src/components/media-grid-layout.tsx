import { ChevronRight, Star } from "lucide-react";
import ReactPlayer from "react-player";
import TrendingCard from "./trending-card";
import ContinueWatchingCard from "./continue-watching-card";
import TopRatedCard from "./top-rated-card";

interface MediaGridLayoutProps {
  data: any; 
  titlePrefix: string;
}

export default function MediaGridLayout({ data, titlePrefix }: MediaGridLayoutProps) {
  const {
    trending,
    popular,
    topRated,
    loading,
    activeVideoKey,
    playingTitle,
    isModalOpen,
    handleWatchNow,
    handleCloseModal,
  } = data;

  if (loading) {
    return <div className="text-zinc-500">Loading {titlePrefix.toLowerCase()} dashboard...</div>;
  }

  return (
    <div className="grid gap-8 w-full">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900/50 border-b border-zinc-800/50">
              <h3 className="text-white font-medium text-lg truncate">
                {playingTitle ? `Now playing: ${playingTitle}` : "Watch Trailer"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 p-2 px-3 rounded-full transition-all text-sm"
              >
                ✕ Close
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
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

      {/* Trending Section */}
      <section className="grid gap-3 w-full">
        <header className="flex justify-between">
          <h2 className="font-medium text-[17.5px]">Trending {titlePrefix.toLowerCase()}</h2>
          <button className="flex gap-1 items-center text-[15px] text-fade">
            See all <ChevronRight size={15} />
          </button>
        </header>
        <div className="flex overflow-x-auto min-h-64 -mx-6 px-6 gap-2.5 pb-4 scroll-container [&::-webkit-scrollbar]:hidden">
          {trending.slice(0, 10).map((item: any) => (
            <TrendingCard key={item.id} movie={item} handleWatchNow={handleWatchNow} />
          ))}
        </div>
      </section>

      {/* Popular / Continue Watching Section */}
      <section className="grid gap-3 w-full">
        <header className="flex justify-between">
          <h2 className="font-medium text-[17.5px]">Popular {titlePrefix.toLowerCase()}</h2>
          <button className="flex gap-1 items-center text-[15px] text-fade">
            See all <ChevronRight size={15} />
          </button>
        </header>
        <div className="flex overflow-x-auto min-h-50 -mx-6 px-6 gap-6 pb-4 scroll-container [&::-webkit-scrollbar]:hidden">
          {popular.slice(0, 10).map((item: any) => (
            <ContinueWatchingCard key={item.id} movie={item} handleWatchNow={handleWatchNow} />
          ))}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="grid gap-3 w-full">
        <header className="flex justify-between">
          <h2 className="flex gap-2 items-center font-medium text-[17.5px]">
            Top Rated <Star stroke="#ffc729" fill="#ffc729" size={16} />
          </h2>
          <button className="flex gap-1 items-center text-[15px] text-fade">
            See all <ChevronRight size={15} />
          </button>
        </header>
        <div className="flex overflow-x-auto -mx-6 px-6 gap-3 pb-4 scroll-container [&::-webkit-scrollbar]:hidden">
          {topRated.slice(0, 10).map((item: any) => (
            <TopRatedCard key={item.id} movie={item} handleWatchNow={handleWatchNow} />
          ))}
        </div>
      </section>
    </div>
  );
}
