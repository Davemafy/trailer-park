import { useMemo, useState, type PropsWithChildren } from "react";
import { SidebarContext } from "./sidebar-context";

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const providerValue = useMemo(
    () => ({
      sidebarOpen,
      setSidebarOpen,
    }),
    [sidebarOpen]
  );

  return <SidebarContext.Provider value={providerValue}>{children}</SidebarContext.Provider>;
};
