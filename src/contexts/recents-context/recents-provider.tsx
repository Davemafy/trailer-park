import { useMemo, useState, type PropsWithChildren } from "react";
import { RecentsContext } from "./recents-context";

export const RecentsProvider = ({ children }: PropsWithChildren) => {
  const [recents, setRecents] = useState<TMDBMovieResponse[] | null>(null);

  const providerValue = useMemo(
    () => ({
      recents,
      setRecents
    }),
    [recents, setRecents],
  );

  return (
    <RecentsContext.Provider value={providerValue}>
      {children}
    </RecentsContext.Provider>
  );
};
