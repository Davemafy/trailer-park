import { Routes, Route } from "react-router";
import Home from "./features/home/";
import AppSidebar from "./components/app-sidebar";
import Discovery from "./features/discovery/";
import Community from "./features/community/";
import ComingSoon from "./features/coming-soon/";
import Recents from "./features/recents/";
import Bookmarks from "./features/bookmarks/";
import TopRated from "./features/top-rated/";
import Downloads from "./features/downloads/";
import Settings from "./features/settings/";
import Help from "./features/help/";
import Series from "./features/series/";
import Movies from "./features/movies/";
import TvShows from "./features/tv-shows/";
import MovieDetails from "./features/movie-details";
import TvShowsDetails from "./features/tv-shows-details";
import SeriesDetails from "./features/series-details";
import AddMovie from "./features/add-movie";
import { RecentsProvider } from "./contexts/recents-context";
import { BookmarksProvider } from "./contexts/bookmarks-context";
import { SidebarProvider } from "./contexts/sidebar-context";
import AddSeries from "./features/add-series";
import { CustomMoviesProvider } from "./contexts/custom-movies-context";
import { useSidebar } from "./hooks/use-sidebar";
import { VideoPlayerProvider } from "./contexts/video-player-context";
import { Toaster } from "@/components/ui/sonner";
import VideoPlayer from "./components/video-player";
import AddCommunity from "./features/add-community";

function App() {
  return (
    <>
      <SidebarProvider>
        <CustomMoviesProvider>
          <RecentsProvider>
            <BookmarksProvider>
              <VideoPlayerProvider>
                <Dashboard />
              </VideoPlayerProvider>
            </BookmarksProvider>
          </RecentsProvider>
        </CustomMoviesProvider>
      </SidebarProvider>
    </>
  );
}

function Dashboard() {
  const { sidebarOpen } = useSidebar();

  return (
    <div className="bg-dark text-white">
      {/* Navigation Menu */}
      <div className="grid h-screen overflow-hidden md:grid-cols-[min-content_1fr]">
        {/* Side Bar*/}
        <AppSidebar />
        <VideoPlayer />

        <div
          className={`h-screen transition ${sidebarOpen && "translate-x-50.75 md:-translate-x-0"}`}
        >
          {/* Route Configuration */}
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Movies />} />
              <Route path="series" element={<Series />} />
              <Route path="tv-shows" element={<TvShows />} />
              <Route path="movies/" element={<Movies />} />
              <Route path="movies/add" element={<AddMovie />} />
              <Route path="series/add" element={<AddSeries />} />
              <Route path="tv-shows/add" element={<AddMovie />} />
              <Route path="movies/:id" element={<MovieDetails />} />
              <Route path="tv-shows/:id" element={<TvShowsDetails />} />
              <Route path="series/:id" element={<SeriesDetails />} />
            </Route>
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/add" element={<AddCommunity />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/recents" element={<Recents />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
          </Routes>
          <Toaster position="bottom-right" theme="dark" />
        </div>
      </div>
    </div>
  );
}

export default App;
