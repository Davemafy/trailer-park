import { Bell, LayoutGrid, Radio } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router";

function Home() {
  const menuItems = [
    { name: "Movies", to: "/" },
    { name: "Series", to: "/series" },
    { name: "Tv Shows", to: "/tv-shows" },
  ];

  const location = useLocation();

  return (
    <>
        <div className="flex h-full w-full flex-col bg-[#0d0c0f] text-white">
          {/* Top Nav */}
          <header className="border-b border-[#151517] p-6 py-5">
            <nav className="flex justify-between">
              <ul className="text-fade flex gap-4 text-sm">
                {menuItems.map((item) => {
                  const isMoviesActive = item.to === "/" && location.pathname.includes("/movies/");

                  const isSeriesActive =
                    item.to === "/series" && location.pathname.includes("/series/");

                  const isTvShowsActive =
                    item.to === "/tv-shows" && location.pathname.includes("/tv-shows/");

                  return (
                    <li>
                      <NavLink
                        to={item.to}
                        end
                        className={({ isActive }) =>
                          `font-medium transition-colors ${isActive || isMoviesActive || isSeriesActive || isTvShowsActive ? "text-white" : "text-fade hover:text-zinc-300"}`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <ul className="flex gap-8 text-[#969899]">
                <li>
                  <button>
                    <Radio size={20} />
                  </button>
                </li>
                <li>
                  <button>
                    <Bell size={20} />
                  </button>
                </li>
                <li>
                  <button className="flex">
                    <LayoutGrid className="fill-[#9698P99] hover:fill-white" size={20} />
                  </button>
                </li>
              </ul>
            </nav>
          </header>

          {/* Main Dashboard */}
          <main className="scroll-container grid h-full w-full scrollbar-none overflow-y-auto p-6 py-0 pt-3 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <Outlet />
          </main>
        </div>
    </>
  );
}

export default Home;
