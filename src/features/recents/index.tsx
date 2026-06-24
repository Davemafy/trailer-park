import { useRecents } from "./useRecents";
import ContinueWatchingCard from "@/components/continue-watching-card";

const Recents = () => {
  const { recents } = useRecents();
  return (
    <div className="p-6 py-4 grid gap-4">
      <h1 className="font-semibold">Recently Viewed</h1>
      <div className="flex flex-wrap gap-8">
        {recents.map((item) => (
          <ContinueWatchingCard key={item.id} movie={item} handleWatchNow={() => alert("Incoming...")} />
        ))}
      </div>
    </div>
  );
};

export default Recents;
