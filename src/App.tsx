import { Routes, Route } from "react-router";
import Home from "./features/home/";
import  AppSidebar  from "./components/app-sidebar";
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
import { RecentsProvider } from "./contexts/recents-context";
import { BookmarksProvider } from "./contexts/bookmarks-context";

function App() {
  
  return (
    <>
      <RecentsProvider>
      <BookmarksProvider>
        <div className="bg-[#0d0c0f] text-white">
          {/* Navigation Menu */}
          <div className="grid h-screen grid-cols-[min-content_1fr]">
            {/* Side Bar*/}
            <AppSidebar />
            <div className="h-screen">
              {/* Route Configuration */}
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route index element={<Movies />} />
                  <Route path="series" element={<Series />} />
                  <Route path="tv-shows" element={<TvShows />} />
                  <Route path="movies/:id" element={<MovieDetails />} />
                  <Route path="tv-shows/:id" element={<TvShowsDetails />} />
                  <Route path="series/:id" element={<SeriesDetails />} />
                </Route>
                <Route path="/discovery" element={<Discovery />} />
                <Route path="/community" element={<Community />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/recents" element={<Recents />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/top-rated" element={<TopRated />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </div>
          </div>
        </div>
      </BookmarksProvider>
      </RecentsProvider>
    </>
  );
}

export default App;
