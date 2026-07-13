import {
  BookmarkMinus,
  Clock,
  Compass,
  Download,
  House,
  Info,
  LogOut,
  Settings,
  Star,
  Timer,
  Users,
  type LucideProps,
} from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { NavLink, useLocation } from "react-router";
import { useSidebar } from "../hooks/use-sidebar";

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
      className={`fixed top-0 z-30 flex h-full w-50 shrink-0 flex-col bg-inherit text-[0.8rem] transition md:static md:transition-none ${!sidebarOpen ? "-translate-x-[110%] md:translate-0" : "md:w-60"}`}
    >
      <div
        onClick={closeSidebar}
        className={`absolute top-0 -z-10 h-full w-screen backdrop-blur-[0.2rem] sm:hidden ${sidebarOpen ? "bg-[#36363618] opacity-100 transition" : "-translate-x-2/3 opacity-0"}`}
      ></div>

      <nav className="text-base flex h-full flex-col bg-[#1a161f] gap-4 sm:gap-0 pt-16 pb-6 pl-6">
        {/* Menu Section */}
        <div className="pb-5">
          <h3 className="text-[11px]">MENU</h3>
          <ul className="relative flex flex-col gap-4 pt-3">
            {menuGroup.map((item) => (
              <SidebarLink key={item.to} closeSidebar={closeSidebar} {...item} />
            ))}
            <li className="bg-fade/9 absolute -bottom-5.25 h-px w-[89%]"></li>
          </ul>
        </div>

        {/* Libary Section */}
        <div className="py-5">
          <h3 className="text-[11px]">LIBRARY</h3>
          <ul className="relative flex flex-col gap-4 pt-3">
            {libraryGroup.map((item) => (
              <SidebarLink key={item.to} closeSidebar={closeSidebar} {...item} />
            ))}
            <li className="bg-fade/9 absolute -bottom-5.25 h-px w-[89%]"></li>
          </ul>
        </div>

        {/* Utility Section */}
        <div>
          <ul className="flex flex-col gap-4 pt-4">
            {utilityGroup.map((item) => (
              <SidebarLink key={item.to} closeSidebar={closeSidebar} {...item} />
            ))}
          </ul>
        </div>
        <div className="mt-auto">
          <button className="select-none" onClick={() => alert("You are signed out!")}>
            <LogOut size={17} />
            <p>Logout</p>
          </button>
        </div>
      </nav>
    </aside>
  );
}

type SidebarLinkProps = {
  to: string;
  label: string;
  closeSidebar: () => void;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

function SidebarLink({ to, label, icon: Icon, closeSidebar }: SidebarLinkProps) {
  const location = useLocation();

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
        onClick={closeSidebar}
        className={({ isActive }) =>
          `relative flex items-center gap-3 transition-colors ${
            isActive || isHomeActive ? "text-white" : "text-fade"
          }`
        }
      >
        {({ isActive }) => {
          const activeState = isActive || isHomeActive;

          return (
            <>
              <Icon stroke={activeState ? "#f3182c" : "currentColor"} size={to === "/" ? 18 : 17} />
              <p>{label}</p>

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
