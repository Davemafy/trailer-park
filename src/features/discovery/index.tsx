import { Search } from "lucide-react";
import { useDiscoveryData } from "./use-discovery-data";
import TopRatedCard from "@/components/top-rated-card";
import { Link } from "react-router";

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

  return (
    <div className="text-h-full *:white flex h-screen w-full flex-col gap-4 bg-[#0d0c0f] p-4 px-6 pb-0">
      {/* Search Input Section Bar */}
      <header className="relative flex w-full max-w-xl items-center">
        <Search className="absolute left-4 h-5 w-5 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSelectedGenre(null);
            setSearchQuery(e.target.value);
          }}
          placeholder="Search movies, series, or documentals..."
          className="w-full rounded-xl border border-zinc-800/60 bg-[#16151a] py-3 pr-4 pl-12 text-[15px] text-white placeholder-zinc-500 transition-colors outline-none focus:border-zinc-700"
        />
      </header>

      {/* Genre Pills Row Container */}
      <div className="mx-auto flex h-max w-full items-center gap-2.5 overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedGenre(null);
          }}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
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

      {/* Content Feed Layout Grid Window */}
      <div className="scroll-container 0 grid h-full w-full scrollbar-none overflow-y-auto pt-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <div className="text-zinc-500">Searching the database...</div>
        ) : results.length === 0 ? (
          <div className="text-zinc-500">
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
