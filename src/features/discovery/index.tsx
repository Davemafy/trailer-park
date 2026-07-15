import { Search } from "lucide-react";
import { useDiscoveryData } from "./use-discovery-data";
import TopRatedCard from "@/components/top-rated-card";
import { Link } from "react-router";
import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";
import { useVideoPlayer } from "@/hooks/use-video-player";
import { Skeleton } from "@/components/ui/skeleton";

export default function Discovery() {
  const {
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    genresList,
    results,
    loading,
  } = useDiscoveryData();

  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { handleWatchNow } = useVideoPlayer();

  return (
    <div className="dicovery-page grid h-full w-full grid-rows-[min-content_1fr] overflow-x-auto bg-[#0d0c0f]">
      <header className="mt-4 flex w-full flex-col overflow-x-auto">
        {/* Search Input Section Bar */}
        <div className="flex w-full items-center justify-between gap-6 px-4 pb-4 md:px-6">
          <div className="relative flex w-full flex-1 items-center gap-6 md:max-w-[80%]">
            <Search className="absolute left-4 h-5 w-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSelectedGenre(null);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search movies, series, or documentals..."
              className="rounded-xl border border-zinc-800/60 bg-[#16151a] py-3 pr-4 pl-12 text-[15px] text-white placeholder-zinc-500 transition-colors outline-none focus:border-zinc-700"
            />
          </div>

          <button className="block md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <X size={20} className="fill-[#9698P99] hover:fill-white" />
            ) : (
              <Menu size={20} className="fill-[#9698P99] hover:fill-white" />
            )}
          </button>
        </div>
        {/* Genre Pills Row Container */}
        <div className="flex h-max w-full items-center gap-2.5 overflow-x-auto border-b border-[#151517] p-4 py-2 pb-4 md:px-6 [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedGenre(null);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
              !selectedGenre && !searchQuery
                ? "border-[#f3182c] bg-[#f3182c] text-white"
                : "text-fade border-zinc-800 bg-transparent hover:text-white"
            }`}
          >
            All Explore
          </button>

          {genresList.map((genre) => (
            <button
              key={genre.id}
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre(genre.id);
              }}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
                selectedGenre === genre.id
                  ? "border-[#f3182c] bg-[#f3182c] text-white"
                  : "text-fade border-zinc-800 bg-transparent hover:text-white"
              }`}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </header>

      {/* Content Feed Layout Grid Window */}
      <div className="scroll-container grid h-full w-full scrollbar-none overflow-y-auto p-4 pt-3 [-ms-overflow-style:none] sm:px-6 sm:pt-6 [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <div className="xs:grid-cols-2 grid grid-rows-[min-content_1fr] gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {[
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ].map(() => (
              <Skeleton className="bg-accent h-50 shrink-0 rounded-xl" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="xs:grid-cols-2 grid gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {[
              0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 0,
            ].map(() => (
              <Skeleton className="bg-accent h-50 shrink-0 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="auto-rows-min xs:grid-cols-2 grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {results.map((item: any) => (
              <Link key={item.id} to={`/movies/${item.id}`}>
                <TopRatedCard
                  media={{
                    ...item,
                    title: item.title || item.name,
                  }}
                  className="flex-1"
                  handleWatchNow={handleWatchNow}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
