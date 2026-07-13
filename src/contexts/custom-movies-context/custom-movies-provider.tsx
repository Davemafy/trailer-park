import { useMemo, type PropsWithChildren } from "react";
import { CustomMoviesContext } from "./custom-movies-context";
import { useIndexedDB } from "@/hooks/use-indexed-db";

export const CustomMoviesProvider = ({ children }: PropsWithChildren) => {
  const [customMovies, setCustomMovies] = useIndexedDB<TMDBMovieResponse[]>("custom-movies", []);

  const providerValue = useMemo(
    () => ({
      customMovies,
      setCustomMovies,
    }),
    [customMovies]
  );

  return (
    <CustomMoviesContext.Provider value={providerValue}>
      {children}
    </CustomMoviesContext.Provider>
  );
};
