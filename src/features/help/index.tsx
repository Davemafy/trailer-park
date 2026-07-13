import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";

const Help = () => {
  const list = [];
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-4 border-b border-[#151517] p-6 py-4">
        <h1 className="text-base">Help</h1>
        <button
          onClick={() => alert("Coming soon!")}
          className="hidden rounded-full bg-neutral-900 p-2 px-5 text-xs sm:block"
        >
          View Info
        </button>
        <button className="block sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
          {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
        </button>
      </div>
      <div className="flex h-full flex-wrap gap-4 overflow-y-auto p-6 py-0 [&::-webkit-scrollbar]:hidden">
        {list.length == 0 && (
          <div className="xs:text-sm text-[13px] text-zinc-500">
            Nothing to see, click that button to view more information.
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
