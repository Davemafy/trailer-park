import { Link } from "react-router";
import { useRecents } from "./useRecents";
import ContinueWatchingCard from "@/components/continue-watching-card";
import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";
import { useVideoPlayer } from "@/hooks/use-video-player";

const Recents = () => {
  const { recents, clearRecents } = useRecents();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const { handleWatchNow } = useVideoPlayer();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[#151517] p-6 py-6 sm:py-4">
        <h1 className="text-base font-semibold">Recents</h1>
        <button
          onClick={() => clearRecents()}
          className="hidden rounded-full bg-neutral-900 p-2 px-5 text-sm sm:block"
        >
          Clear Recents
        </button>
        <button className="block md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
          {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
        </button>
      </div>
      <div className="flex h-full flex-wrap gap-4 overflow-y-auto p-6 py-0 [&::-webkit-scrollbar]:hidden">
        {recents.length == 0 && (
          <div className="text-base text-zinc-400 sm:text-sm sm:text-zinc-500">
            No Recents yet, click the add movie button to add a bookmark.
          </div>
        )}
        {recents.map((item) => (
          <Link to={`/movies/${item.id}`}>
            <ContinueWatchingCard key={item.id} media={item} handleWatchNow={handleWatchNow} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recents;
