import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";

const Community = () => {
  const list = [];

  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between border-b border-[#151517] p-6 py-6 sm:py-4">
        <h1 className="text-base font-semibold">Community</h1>
        <button
          onClick={() => alert("Coming soon!")}
          className="xs:text-sm hidden rounded-full bg-neutral-900 p-2 px-5 text-xs md:block"
        >
          Find your community
        </button>
        <button className="block md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
          {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
        </button>
      </div>
      <div className="flex h-full flex-wrap gap-4 overflow-y-auto p-6 py-0 text-[12px] [&::-webkit-scrollbar]:hidden">
        {list.length == 0 && (
          <div className="text-zinc-500">
            <p className="xs:text-sm text-[13px]">
              Nothing to see, click the join button to join a community.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
