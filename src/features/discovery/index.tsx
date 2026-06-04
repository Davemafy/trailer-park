import { Search } from "lucide-react";
import { useDiscoveryData } from "./use-discovery-data";
import TopRatedCard from "@/components/top-rated-card";

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
    <div className="p-4 px-6 pb-0 h-screen  flex flex-col gap-4 w-full  text-h-full *:white bg-[#0d0c0f]">
      {/* Search Input Section Bar */}
      <header  className="relative flex items-center w-full max-w-xl">
        <Search className="absolute left-4 text-zinc-500 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSelectedGenre(null); 
            setSearchQuery(e.target.value);
          }}
          placeholder="Search movies, series, or documentals..."
          className="w-full pl-12 pr-4 py-3 bg-[#16151a] border border-zinc-800/60 rounded-xl outline-none text-[15px] text-white placeholder-zinc-500 focus:border-zinc-700 transition-colors"
        />
      </header>

      {/* Genre Pills Row Container */}
      <div className="flex items-center h-max gap-2.5 w-full overflow-x-auto py-2 [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedGenre(null);
          }}
          className={`px-4 py-1.5 rounded-full text-sm transition-all font-medium border ${
            !selectedGenre && !searchQuery
              ? "bg-[#f3182c] border-[#f3182c] text-white"
              : "bg-transparent border-zinc-800 text-fade hover:text-white"
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
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all font-medium border ${
              selectedGenre === genre.id
                ? "bg-[#f3182c] border-[#f3182c] text-white"
                : "bg-transparent border-zinc-800 text-fade hover:text-white"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Content Feed Layout Grid Window */}
      <div className="scroll-container grid h-full w-full scrollbar-none overflow-y-auto 0 pt-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {loading ? (
          <div className="text-zinc-500">Searching the database...</div>
        ) : results.length === 0 ? (
          <div className="text-zinc-500">No items found matching criteria criteria. Try checking your keyword spellings.</div>
        ) : (
          <div className="flex flex-wrap gap-6">
            {results.map((item: any) => (
              <div key={item.id} className="transition-transform duration-200">
                <TopRatedCard
                  movie={{
                    ...item,
                    title: item.title || item.name,
                  }}
                  handleWatchNow={(_, name) => alert(`Streaming: ${name} `)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
