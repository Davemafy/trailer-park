import { useMemo, type PropsWithChildren } from "react";
import { BookmarksContext } from "./bookmarks-context";
import { useIndexedDB } from "@/hooks/use-indexed-db";


export const BookmarksProvider = ({ children }: PropsWithChildren) => {
  const [bookmarks, setBookmarks] = useIndexedDB<TMDBMovieResponse[]>("Bookmarks", []);

  const updateBookmarks = (movie: TMDBMovieResponse) => {
    if (bookmarks.some(bookmark => bookmark.id === movie.id)) {
      
      return alert("Already bookmarked!");
    }

    setBookmarks((bookmarks) => [...bookmarks, movie]);
    return alert("Added to bookmaks.")
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
