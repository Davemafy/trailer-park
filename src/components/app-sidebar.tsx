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

export default function AppSidebar() {
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

  return (
    <div className="w-54 bg-[#1a161f]">
      <aside className="text-fade relative h-full shadow-2xl shadow-black">
        <nav className="flex h-full flex-col pt-16 pb-6 pl-6 text-[15px]">
          {/* Menu Section */}
          <div className="pb-5">
            <h3 className="text-[11px]">MENU</h3>
            <ul className="relative flex flex-col gap-4 pt-3">
              {menuGroup.map((item) => (
                <SidebarLink key={item.to} {...item} />
              ))}
              <li className="bg-fade/9 absolute -bottom-5.25 h-px w-[89%]"></li>
            </ul>
          </div>

          {/* Libary Section */}
          <div className="py-5">
            <h3 className="text-[11px]">LIBRARY</h3>
            <ul className="relative flex flex-col gap-4 pt-3">
              {libraryGroup.map((item) => (
                <SidebarLink key={item.to} {...item} />
              ))}
              <li className="bg-fade/9 absolute -bottom-5.25 h-px w-[89%]"></li>
            </ul>
          </div>

          {/* Utility Section */}
          <div>
            <ul className="flex flex-col gap-4 pt-4">
              {utilityGroup.map((item) => (
                <SidebarLink key={item.to} {...item} />
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
    </div>
  );
};

type SidebarLinkProps = {
  to: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

function SidebarLink({ to, label, icon: Icon }: SidebarLinkProps) {
  const location = useLocation();

  const isHomeActive =
    to === "/" &&
    (location.pathname === "/" ||
      location.pathname === "/series" ||
      location.pathname === "/tv-shows");

  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative flex items-center gap-3 transition-colors ${
            isActive || isHomeActive ? "font-medium text-white" : "text-fade hover:text-white"
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
        )}}
      </NavLink>
    </li>
  );
}
