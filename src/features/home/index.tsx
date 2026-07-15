import { useSidebar } from "@/hooks/use-sidebar";
import { Bell, LayoutGrid, Menu, Radio, X } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router";

function Home() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const menuItems = [
    { name: "Movies", to: "/" },
    { name: "Series", to: "/series" },
    { name: "Tv Shows", to: "/tv-shows" },
  ];

  const location = useLocation();

  return (
    <>
      <div className="bg-dark grid h-full grid-rows-[min-content_1fr] text-white">
        {/* Top Nav */}
        <header className="border-b border-[#151517] p-6 py-5">
          <nav className="flex justify-between">
            <ul className="text-fade flex gap-3 text-sm">
              {menuItems.map((item, index) => {
                const isMoviesActive = item.to === "/" && location.pathname.includes("/movies/");

                const isSeriesActive =
                  item.to === "/series" && location.pathname.includes("/series/");

                const isTvShowsActive =
                  item.to === "/tv-shows" && location.pathname.includes("/tv-shows/");

                return (
                  <li key={index}>
                    <NavLink
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        `text-sm font-medium transition-colors ${isActive || isMoviesActive || isSeriesActive || isTvShowsActive ? "text-white" : "text-fade hover:text-zinc-300"}`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <ul className="flex gap-4 text-[#969899] sm:gap-8">
              <li className="hidden sm:block">
                <button>
                  <Radio size={20} />
                </button>
              </li>
              <li>
                <button>
                  <Bell size={20} />
                </button>
              </li>
              <li className="hidden md:block">
                <button className="flex">
                  <LayoutGrid className="fill-[#9698P99] hover:fill-white" size={20} />
                </button>
              </li>
              <li className="md:hidden">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                  {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
                  {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
                </button>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Dashboard */}
        <main className="scroll-container grid h-full w-full scrollbar-none overflow-x-auto overflow-y-auto p-6 pb-0 [-ms-overflow-style:none] sm:p-6 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Home;
