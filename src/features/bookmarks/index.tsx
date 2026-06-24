import TrendingCard from "@/components/trending-card";
import { useBookmarks } from "./useBookmarks";

const Bookmarks = () => {
  const { bookmarks, clearBookmarks } = useBookmarks();

  return (
    <div className="grid gap-4 p-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Bookmarks</h1>
        <button onClick={() => clearBookmarks()} className="text-sm">Clear Bookmarks</button>
      </div>
      <div className="flex flex-wrap gap-8">
        {bookmarks.length == 0 && <div className="text-zinc-500 text-sm">No bookmarks yet, click the add movie button to add a bookmark.</div>}
        {bookmarks.map((item) => (
          <TrendingCard key={item.id} movie={item} handleWatchNow={() => alert("Incoming...")} />
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
