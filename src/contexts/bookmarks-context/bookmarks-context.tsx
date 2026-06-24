import { createContext, type Dispatch, type SetStateAction } from "react";

interface BookmarksContextType {
  bookmarks: TMDBMovieResponse[];
  setBookmarks: Dispatch<SetStateAction<TMDBMovieResponse[]>>;
  updateBookmarks: (movie: TMDBMovieResponse) => void;
  clearBookmarks: () => void;
}

export const BookmarksContext = createContext<BookmarksContextType | null>(null);

