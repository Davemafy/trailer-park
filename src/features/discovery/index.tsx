import { Search } from "lucide-react";
import { useDiscoveryData } from "./use-discovery-data";
import TopRatedCard from "@/components/top-rated-card";
import { Link } from "react-router";

import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";

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

  return (
    <div className="grid h-full w-full grid-rows-[min-content_min-content_1fr] gap-4 overflow-x-auto bg-[#0d0c0f]">
      {/* Search Input Section Bar */}
      <header className="relative mx-4 mt-4 flex max-w-xl items-center gap-6">
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

        <button className="block sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
          {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
        </button>
      </header>

      {/* Genre Pills Row Container */}
      <div className="flex h-max w-full items-center gap-2.5 overflow-x-auto p-4 py-2 [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedGenre(null);
          }}
          className={`text-sm rounded-full border px-4 py-1.5  font-medium whitespace-nowrap transition-all ${
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
            className={`text-sm rounded-full border px-4 py-1.5  font-medium whitespace-nowrap transition-all ${
              selectedGenre === genre.id
                ? "border-[#f3182c] bg-[#f3182c] text-white"
                : "text-fade border-zinc-800 bg-transparent hover:text-white"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Content Feed Layout Grid Window */}
      <div className="scroll-container grid h-full w-full scrollbar-none overflow-y-auto p-4 pt-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <div className="text-zinc-500">Searching the database...</div>
        ) : results.length === 0 ? (
          <div className="text-sm  text-zinc-500">
            No items found matching criteria criteria. Try checking your keyword spellings.
          </div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {results.map((item: any) => (
              <div key={item.id} className="transition-transform duration-200">
                <Link to={`/movies/${item.id}`}>
                  <TopRatedCard
                    movie={{
                      ...item,
                      title: item.title || item.name,
                    }}
                    handleWatchNow={(_, name) => alert(`Streaming: ${name} `)}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
