import { useMemo, type PropsWithChildren } from "react";
import { RecentsContext } from "./recents-context";
import { useIndexedDB } from "@/hooks/use-indexed-db";

export const RecentsProvider = ({ children }: PropsWithChildren) => {
  const [recents, setRecents] = useIndexedDB<TMDBMovieResponse[]>("recents", []);

  const updateRecents = (movie: TMDBMovieResponse) => {
    if (recents.some((recent) => recent.id === movie.id)) return;

    setRecents((prevRecents) => [...prevRecents, movie]);
  };

  const clearRecents = () => {
    setRecents([]);
  };

  const providerValue = useMemo(
    () => ({
      recents,
      setRecents,
      updateRecents,
      clearRecents
    }),
    [recents, setRecents]
  );

  return <RecentsContext.Provider value={providerValue}>{children}</RecentsContext.Provider>;
};
