import { ChevronRight, Plus, Star } from "lucide-react";
import TrendingCard from "./trending-card";
import ContinueWatchingCard from "./continue-watching-card";
import TopRatedCard from "./top-rated-card";
import { Link, useLocation } from "react-router";
import { Skeleton } from "./ui/skeleton";
import { useVideoPlayer } from "@/hooks/use-video-player";

interface MediaGridLayoutProps {
  data: MediaDashboardType;
  titlePrefix: string;
}

export default function MediaGridLayout({ data, titlePrefix }: MediaGridLayoutProps) {
  const { trending, popular, topRated, loading } = data;
  const { handleWatchNow } = useVideoPlayer()

  if (loading) {
    return <DemoLoader titlePrefix={titlePrefix} />;
  }

  const location = useLocation();
  const moviepath = `${location.pathname === "/" ? "movies" : location.pathname}`;

  return (
    <div className="grid w-full gap-2">
      {/* Trending Section */}
      <section className="grid w-full gap-3">
        <header className="flex justify-between">
          <h2 className="text-base sm:text-sm font-medium">Trending {titlePrefix.toLowerCase()}</h2>
          <button className="text-fade flex items-center gap-1 text-[15px]">
            See all <ChevronRight size={15} />
          </button>
        </header>
        <div className="scroll-container -mx-6 flex min-h-64 gap-2.5 overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden">
          {trending.slice(0, 10).map((item) => (
            <Link to={`${moviepath}/${item.id}`}>
              <TrendingCard key={item.id} media={item} handleWatchNow={handleWatchNow} />
            </Link>
          ))}
          {trending.length == 0 && (
            <>
              <Skeleton className="bg-accent h-60 w-100 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-60 w-100 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-60 w-100 shrink-0 rounded-xl" />
            </>
          )}
        </div>
      </section>

      {/* Popular / Continue Watching Section */}
      <section className="grid w-full gap-3">
        <header className="flex justify-between">
          <h2 className="text-base sm:text-sm font-medium">Continue watching</h2>
          <Link to={"/recents"} className="text-fade flex items-center gap-1 text-[15px]">
            See all <ChevronRight size={15} />
          </Link>
        </header>
        <div className="scroll-container -mx-6 flex min-h-50 gap-3 overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden">
          {popular.slice(0, 10).map((item: any) => (
            <ContinueWatchingCard key={item.id} media={item} handleWatchNow={handleWatchNow} />
          ))}

          {popular.length == 0 && (
            <>
              <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
            </>
          )}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="grid w-full gap-3">
        <header className="flex justify-between">
          <h2 className="flex items-center gap-2 text-base font-medium">
            Top Rated <Star stroke="#ffc729" fill="#ffc729" size={16} />
          </h2>
          <button className="text-fade flex items-center gap-1 text-[15px]">
            See all <ChevronRight size={15} />
          </button>
        </header>
        <div className="scroll-container -mx-6 flex gap-3 overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden">
          {topRated.slice(0, 10).map((item: any) => (
            <Link to={`${moviepath}/${item.id}`}>
              <TopRatedCard key={item.id} media={item} handleWatchNow={handleWatchNow} />
            </Link>
          ))}
          {topRated.length == 0 && (
            <>
              <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
              <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
            </>
          )}
        </div>
      </section>
      <footer>
        <div className="fixed right-6 bottom-6">
          <Link
            to={`/${titlePrefix.toLowerCase().replace(" ", "-")}/add`}
            className="flex items-center gap-1 rounded-xl bg-red-600 p-2 px-2.5 text-base"
          >
            Add{" "}
            {titlePrefix.endsWith("series")
              ? titlePrefix.toLocaleLowerCase()
              : titlePrefix.slice(0, -1).toLowerCase()}{" "}
            <Plus size={18} />
          </Link>
        </div>
      </footer>
    </div>
  );
}

type DemoLoaderProps = {
  titlePrefix: string;
};

function DemoLoader({ titlePrefix }: DemoLoaderProps) {
  return (
    <div className="grid w-full gap-2">
      {/* Trending Loading Section */}
      <section className="grid w-full gap-3">
        <header className="flex justify-between">
          <h2 className="text-base sm:text-sm font-medium">Trending {titlePrefix.toLowerCase()}</h2>
          <button className="text-fade flex items-center gap-1 text-[15px]">
            See all <ChevronRight size={15} />
          </button>
        </header>
        <div className="scroll-container -mx-6 flex min-h-64 gap-2.5 overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden">
          <Skeleton className="bg-accent h-60 w-100 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-60 w-100 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-60 w-100 shrink-0 rounded-xl" />
        </div>
      </section>

      {/* Contrinue Watching Loading Section */}
      <section className="grid w-full gap-3">
        <header className="flex justify-between">
          <h2 className="text-base sm:text-sm font-medium">Continue watching</h2>
          <Link to={"/recents"} className="text-fade flex items-center gap-1 text-[15px]">
            See all <ChevronRight size={15} />
          </Link>
        </header>
        <div className="scroll-container -mx-6 flex min-h-50 gap-3 overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden">
          <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-50 w-70 shrink-0 rounded-xl" />
        </div>
      </section>

      {/* Top Rated Loading Section */}
      <section className="grid w-full gap-3">
        <header className="flex justify-between">
          <h2 className="flex items-center gap-2 text-base font-medium">
            Top Rated <Star stroke="#ffc729" fill="#ffc729" size={16} />
          </h2>
          <button className="text-fade flex items-center gap-1 text-[15px]">
            See all <ChevronRight size={15} />
          </button>
        </header>
        <div className="scroll-container -mx-6 flex gap-3 overflow-x-auto px-6 pb-4 [&::-webkit-scrollbar]:hidden">
          <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
          <Skeleton className="bg-accent h-45 w-45 shrink-0 rounded-xl" />
        </div>
      </section>
    </div>
  );
}
