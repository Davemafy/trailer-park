import { useMemo, type PropsWithChildren } from "react";
import { RecentsContext } from "./recents-context";
import { useLocalStorage } from "@/hooks/use-local-storage";


export const RecentsProvider = ({ children }: PropsWithChildren) => {
  const [recents, setRecents] = useLocalStorage<TMDBMovieResponse[]>("recents", []);

  const updateRecents = (movie: TMDBMovieResponse) => {
    setRecents((prevRecents) => [...prevRecents, movie]);
  };
  
  const providerValue = useMemo(
    () => ({
      recents,
      setRecents,
      updateRecents
    }),
    [recents, setRecents]
  );

  return <RecentsContext.Provider value={providerValue}>{children}</RecentsContext.Provider>;
};
