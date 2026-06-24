import { useContext } from "react"
import { RecentsContext } from "../../contexts/recents-context"

export const useRecents = () => {
  const context = useContext(RecentsContext)
  if (context === null) {
    throw new Error("useRecents must be used within a RecentsProvider")
  }

  return context
}