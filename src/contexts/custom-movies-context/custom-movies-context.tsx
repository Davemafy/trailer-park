import { createContext, type Dispatch, type SetStateAction } from "react";

export interface CustomMoviesContextType {
  customMovies: TMDBMovieResponse[];
  setCustomMovies: Dispatch<SetStateAction<TMDBMovieResponse[]>>;
  deleteCustomMovie: (id: number) => void;
}

export const CustomMoviesContext = createContext<CustomMoviesContextType | null>(null);
