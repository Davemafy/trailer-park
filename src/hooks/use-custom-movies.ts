import { useContext } from "react"
import { CustomMoviesContext } from "../contexts/custom-movies-context"

export const useCustomMovies = () => {
  const context = useContext(CustomMoviesContext)
  if (context === null) {
    throw new Error("useCustomMovies must be used within a CustomMoviesProvider")
  }

  return context
}