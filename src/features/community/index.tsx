import { useSidebar } from "@/hooks/use-sidebar";
import {  Menu, PlusCircle, Search, X } from "lucide-react";
import comingSoonPath from "../../assets/img/coming-soon.png";
import { Link } from "react-router";


const Community = () => {

  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between p-6 py-6 sm:p-7 sm:px-8">
        <div>
          <h1 className="mb-2 text-[18px] font-semibold">Community</h1>
          <p className="hidden sm:block text-[13px] font-medium text-[#727478]">
            Connect, discuss and share with fellow movie & TV lovers.
          </p>
        </div>
        <button
          onClick={() => alert("Coming soon!")}
          className="xs:text-sm hidden items-center justify-center gap-2 rounded-xl border border-[#1c1c1e] p-2 px-4 text-xs md:flex"
        >
          <Search size={16} /> Find your community
        </button>
        <button className="block md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
          {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
        </button>
      </div>
      <div className="flex h-full p-6 w-full flex-col items-center pt-12 gap-6">
        <img className="w-full max-w-[35rem]" src={comingSoonPath} alt="" />
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-base font-semibold">You're not part of any community yet.</h1>
          <p className="text-sm text-zinc-400">
            Join communities to connect, discuss and share your passion.
          </p>
        </div>
        <div className="flex flex-wrap-reverse justify-center items-center gap-4">
          <button className="rounded-md bg-[#d2162c] p-2.5 px-5 text-[13px]">
            Find communities
          </button>
          <Link to={"./add"} className="flex items-center justify-center gap-2 rounded-md border border-[#1c1c1e] p-2.5 px-5 text-[13px]">
            <PlusCircle  size={13}/> Create community
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Community;
