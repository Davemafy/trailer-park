import { createContext, type Dispatch, type SetStateAction } from "react";

export interface SidebarContextType {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextType | null>(null);
