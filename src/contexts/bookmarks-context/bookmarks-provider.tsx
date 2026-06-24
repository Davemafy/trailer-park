import { useMemo, type PropsWithChildren } from "react";
import { BookmarksContext } from "./bookmarks-context";
import { useLocalStorage } from "@/hooks/use-local-storage";


export const BookmarksProvider = ({ children }: PropsWithChildren) => {
  const [bookmarks, setBookmarks] = useLocalStorage<TMDBMovieResponse[]>("Bookmarks", []);

  const updateBookmarks = (movie: TMDBMovieResponse) => {
    setBookmarks((bookmarks) => [...bookmarks, movie]);
  };
  
  const clearBookmarks = () => {
    setBookmarks([])
  }

  const providerValue = useMemo(
    () => ({
      bookmarks,
      setBookmarks,
      updateBookmarks,
      clearBookmarks,
    }),
    [bookmarks, setBookmarks]
  );

  return <BookmarksContext.Provider value={providerValue}>{children}</BookmarksContext.Provider>;
};
