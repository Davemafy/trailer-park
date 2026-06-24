import { createContext, type Dispatch, type SetStateAction } from "react";

interface RecentsContextType {
  recents: TMDBMovieResponse[] | null;
  setRecents: Dispatch<SetStateAction<TMDBMovieResponse[] | null>>;
  updateRecents: (movie: TMDBMovieResponse) => void;
  
}

export const RecentsContext = createContext<RecentsContextType | null>(null);
