import { useContext } from "react"
import { BookmarksContext } from "../../contexts/bookmarks-context"

export const useBookmarks = () => {
  const context = useContext(BookmarksContext)
  if (context === null) {
    throw new Error("useBookmarks must be used within a BookmarksProvider")
  }

  return context
}