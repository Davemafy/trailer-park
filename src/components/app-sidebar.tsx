import {
  BookmarkMinus,
  Clock,
  Compass,
  Download,
  House,
  Info,
  LogOut,
  Settings,
  SidebarClose,
  SidebarOpen,
  Star,
  Timer,
  Users,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { NavLink, useLocation } from "react-router";
import { useSidebar } from "../hooks/use-sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AppSidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const menuGroup = [
    { to: "/", label: "Home", icon: House },
    { to: "/discovery", label: "Discovery", icon: Compass },
    { to: "/community", label: "Community", icon: Users },
    { to: "/coming-soon", label: "Coming soon", icon: Timer },
  ];

  const libraryGroup = [
    { to: "/recents", label: "Recent", icon: Clock },
    { to: "/bookmarks", label: "Bookmarked", icon: BookmarkMinus },
    { to: "/top-rated", label: "Top Rated", icon: Star },
    { to: "/downloads", label: "Downloaded", icon: Download },
  ];

  const utilityGroup = [
    { to: "/settings", label: "Settings", icon: Settings },
    { to: "/help", label: "Help", icon: Info },
  ];

   const closeSidebar = () => setSidebarOpen(false);

  return (
    <aside
      className={`fixed top-0 z-30 flex h-full min-w-50 shrink-0 flex-col bg-inherit text-[0.8rem] transition-all md:static ${!sidebarOpen ? "translate-x-[-110%] md:min-w-10 md:translate-0" : ""}`}
    >
      <div
        onClick={closeSidebar}
        className={`absolute top-0 -z-10 h-full w-screen backdrop-blur-[0.2rem] md:hidden ${sidebarOpen ? "bg-black/80 opacity-100 transition" : "-translate-x-2/3 opacity-0"}`}
      ></div>

      <nav className="relative flex h-full flex-col gap-4 bg-[#1a161f] pt-16 pb-6 pl-6 text-base sm:gap-0">
        {/* Menu Section */}
        <div className="absolute top-4 right-4.5">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? (
              <SidebarClose className="text-zinc-600" size={20} />
            ) : (
              <SidebarOpen className="text-zinc-600" size={20} />
            )}
          </button>
        </div>
        <div className="pb-5">
          <h3 className={`text-[11px]`}>{sidebarOpen ? "MENU" : "MU"}</h3>
          <ul className="relative flex flex-col gap-4 pt-3">
            {menuGroup.map((item) => (
              <SidebarLink
                key={item.to}
                sidebarOpen={sidebarOpen}
                closeSidebar={closeSidebar}
                {...item}
              />
            ))}
            <li className="bg-fade/9 absolute -bottom-5.25 h-px w-[89%]"></li>
          </ul>
        </div>

        {/* Libary Section */}
        <div className="py-5">
          <h3 className={`text-[11px]`}>{sidebarOpen ? "LIBRARY" : "LB"}</h3>
          <ul className="relative flex flex-col gap-4 pt-3">
            {libraryGroup.map((item) => (
              <SidebarLink
                key={item.to}
                sidebarOpen={sidebarOpen}
                closeSidebar={closeSidebar}
                {...item}
              />
            ))}
            <li className="bg-fade/9 absolute -bottom-5.25 h-px w-[89%]"></li>
          </ul>
        </div>

        {/* Utility Section */}
        <div>
          <ul className="flex flex-col gap-4 pt-4">
            {utilityGroup.map((item) => (
              <SidebarLink
                key={item.to}
                sidebarOpen={sidebarOpen}
                closeSidebar={closeSidebar}
                {...item}
              />
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <button className="select-none" onClick={() => alert("You are signed out!")}>
            <LogOut size={17} className="text-red-600" />
            <p
              className={`truncate overflow-clip transition-all ${!sidebarOpen ? "whitespace-nowrap sm:max-w-0 sm:opacity-0" : "opacity-100 sm:max-w-full"}`}
            >
              Logout
            </p>
          </button>
        </div>
      </nav>
    </aside>
  );
}

type SidebarLinkProps = {
  to: string;
  label: string;
  sidebarOpen: boolean;
  closeSidebar: () => void;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

function SidebarLink({ to, label, icon: Icon, sidebarOpen, closeSidebar }: SidebarLinkProps) {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isHomeActive =
    to === "/" &&
    (location.pathname === "/" ||
      location.pathname === "/series" ||
      location.pathname === "/tv-shows" ||
      location.pathname.includes("/movies/") ||
      location.pathname.includes("/series/") ||
      location.pathname.includes("/tv-shows/"));

  return (
    <li>
      <NavLink
        to={to}
        onClick={() => {
          if (isMobile) {
            closeSidebar()
          }
        }}
        className={({ isActive }) =>
          `relative flex items-center gap-3 pr-2 transition-colors ${
            isActive || isHomeActive ? "text-white" : "text-fade"
          }`
        }
      >
        {({ isActive }) => {
          const activeState = isActive || isHomeActive;

          return (
            <>
              <Icon stroke={activeState ? "#f3182c" : "currentColor"} size={to === "/" ? 18 : 17} />
              <p className={`transition-all overflow-clip truncate ${!sidebarOpen ? "sm:max-w-0 sm:opacity-0 whitespace-nowrap" : "opacity-100 sm:max-w-full"}`}>{label}</p>

              {activeState && (
                <div className="absolute top-0 right-0 h-full w-1 rounded-tl-sm rounded-bl-sm bg-[#f3182c]"></div>
              )}
            </>
          );
        }}
      </NavLink>
    </li>
  );
}
