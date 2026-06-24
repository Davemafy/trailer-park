import { createContext, type Dispatch, type SetStateAction } from "react";

interface BookmarksContextType {
  bookmarks: TMDBMovieResponse[] | null;
  setBookmarks: Dispatch<SetStateAction<TMDBMovieResponse[] | null>>;
  updateBookmarks: (movie: TMDBMovieResponse) => void;
  clearBookmarks: () => void;
}

export const BookmarksContext = createContext<BookmarksContextType | null>(null);
