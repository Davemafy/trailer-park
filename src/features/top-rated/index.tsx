import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";

const TopRated = () => {
  const list = [];
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[#151517] p-6 py-6 sm:py-4">
        <h1 className="text-base font-semibold">Top Rated</h1>
        <button
          onClick={() => alert("Coming soon!")}
          className="hidden rounded-full bg-neutral-900 p-2 px-5 text-sm sm:block"
        >
          Search More
        </button>
        <button className="block sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
          {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
        </button>
      </div>
      <div className="flex h-full flex-wrap gap-4 overflow-y-auto p-6 py-0 [&::-webkit-scrollbar]:hidden">
        {list.length == 0 && (
          <div className="text-base text-zinc-400 sm:text-sm sm:text-zinc-500">
            Nothing to see, this feature is coming soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRated;
