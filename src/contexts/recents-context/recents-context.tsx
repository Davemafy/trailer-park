import { createContext, type Dispatch, type SetStateAction } from "react";

interface RecentsContextType {
  recents: TMDBMovieResponse[];
  setRecents: Dispatch<SetStateAction<TMDBMovieResponse[]>>;
  updateRecents: (movie: TMDBMovieResponse) => void;
  
}

export const RecentsContext = createContext<RecentsContextType | null>(null);
