import { CloudUpload, Eye, Plus, ImageDown, EyeClosed } from "lucide-react";


import {
  useEffect,
  useRef,
  useState,
  type SubmitEventHandler,
} from "react";
import { useCustomMovies } from "@/hooks/use-custom-movies";
import { useIndexedDB } from "@/hooks/use-indexed-db";
import PreviewMovie from "@/components/preview-movie";
import { useIsMobile } from "@/hooks/use-mobile";
import CastBlock from "@/components/cast-block";

const defaultMovie: TMDBMovieResponse = {
  id: 0, 
  adult: false,
  backdrop_path: null,
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: null,
  imdb_id: null,
  origin_country: [],
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0, 
  poster_path: null,
  production_companies: [],
  production_countries: [],
  release_date: "",
  revenue: 0, 
  runtime: null,
  spoken_languages: [],
  status: "Released", 
  tagline: null,
  title: "",
  video: false,
  category: "trending",
  vote_average: 0.0,
  credits: {
    cast: [],
  },
  vote_count: 0, 
};


const AddMovie = () => {
  const { customMovies, setCustomMovies } = useCustomMovies();

  const [movie, setMovie] = useIndexedDB<TMDBMovieResponse>("movie", defaultMovie);
  const [posterName, setPosterName] = useIndexedDB<string | null>("poster-name", null);
  const [previewing, setPreviewing] = useState(!useIsMobile());

  const generateUniqueNumericId = (): number => {
    const timestamp = Date.now();
    const randomValue = Math.floor(Math.random() * 1000);

    return timestamp * 1000 + randomValue;
  };

  const previewRef = useRef<HTMLInputElement | null>(null);
  const castInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const castAvatarRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const lastIndex = (movie?.credits?.cast.length ?? 0) - 1;
    const newestInput = castInputRefs.current[lastIndex];

    if (newestInput instanceof HTMLElement) {
      const container = newestInput.closest(".form-container");

      if (container instanceof HTMLElement) {
        const elementOffset = newestInput.offsetTop;
        const extraPadding = 80;

        container.scrollTo({
          top: elementOffset - container.offsetTop + extraPadding,
          behavior: "smooth",
        });
      }

      const inputToFocus = newestInput.querySelector(`actor-${lastIndex}-name`);
      if (inputToFocus instanceof HTMLInputElement) {

        setTimeout(() => {
          inputToFocus.focus({ preventScroll: true });
        }, 100);
      }
    }
  }, [movie?.credits?.cast.length]);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target?.files?.[0];

      if (file) {
        setMovie((movie) => ({
          ...movie,
          backdrop_path: file,
          poster_path: file,
        }));
      }
    };

    node.addEventListener("change", handleChange);

    return () => node.removeEventListener("change", handleChange);
  }, []);

  const previewMovie = () => {
    setPreviewing(!previewing);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    publishMovie();
  };

  const publishMovie = () => {
    const newMovieWithId = {
      ...movie,
      id: generateUniqueNumericId(),
    };

    setCustomMovies([...customMovies, newMovieWithId]);

    alert("Movie added succesfully");
    setMovie(defaultMovie);
  };

  return (
    <div className="-my-4 flex h-full gap-x-0 overflow-y-auto sm:-my-6 sm:gap-x-4">
      <form
        onSubmit={handleSubmit}
        className={`form-container flex h-full w-full scrollbar-none flex-col gap-2 overflow-y-auto p-0.5 pb-18 text-sm transition-all duration-500 ease-in-out sm:pt-4 ${
          previewing
            ? "pointer-events-none max-w-0 overflow-hidden p-0 opacity-0 sm:pointer-events-auto sm:max-w-full sm:p-0.5 sm:opacity-100"
            : "max-w-full opacity-100"
        }`}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="movie-name">Movie Name</label>
          <input
            name="movie-name"
            id="movie-name"
            value={movie.name}
            onInput={(e) => {
              const value = e.currentTarget.value;
              setMovie((movie) => {
                return { ...movie, name: value, title: value };
              });
            }}
            className="rounded-xl border border-gray-600 p-2 font-light"
            type="text"
            placeholder="i.e the Avengers, Merlin, Avalache 2..."
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="movie-description">Movie Description</label>
          <textarea
            name="movie-description"
            id="movie-description"
            value={movie.overview}
            onChange={(e) => {
              setMovie({ ...movie, overview: e.currentTarget.value });
            }}
            className="rounded-xl border border-gray-600 p-2 font-light"
            rows={4}
            placeholder="Description.."
          ></textarea>
        </div>
        <div className="grid gap-2">
          <div className="flex justify-between">
            <label htmlFor="movie-banner">Movie Banner</label>
            {movie.backdrop_path && (
              <button
                onClick={() => {
                  setPosterName(null);
                  setMovie({ ...movie, backdrop_path: null, poster_path: null });
                }}
                className="text-xs font-medium text-red-500"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex w-full flex-col gap-2 overflow-hidden transition">
            <div className="hidden">
              <label htmlFor="course-image">Select an image:</label>
              <input
                ref={previewRef}
                type="file"
                onChange={(e) => {
                  e.preventDefault();
                  const path = e.currentTarget.value.split("\\");
                  const fileName = path[path.length - 1];
                  setPosterName(fileName);
                }}
                id="course-image"
                name="course-image"
                accept="image/*"
              />
            </div>
            <div className="flex gap-4 p-1 text-sm sm:min-h-30">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  previewRef.current && previewRef.current.click();
                }}
                className="flex w-full cursor-pointer flex-col items-center rounded-2xl border border-dashed border-gray-400 p-3 text-center text-xs text-gray-600 hover:bg-neutral-900"
              >
                <ImageDown className="mb-2" />
                <p>
                  <span className="mb-1 block text-neutral-400">{posterName}</span>
                  <a className="mr-1 inline-block text-blue-500 underline focus:text-purple-500">
                    Click to upload
                  </a>
                  or drag and drop
                </p>
                <p className="text-[0.6rem]">Max, File Size: 15MB</p>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="movie-rating">Movie Rating</label>
            <input
              type="number"
              name="movie-rating"
              id="movie-rating"
              value={movie.vote_average}
              onChange={(e) => {
                setMovie({ ...movie, vote_average: e.currentTarget.valueAsNumber });
              }}
              placeholder="4.5"
              max={10}
              min={1}
              step={"0.1"}
              className="rounded-xl border border-gray-600 p-2 font-light"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <label htmlFor="movie-year">Movie Year</label>
            <input
              type="number"
              name="movie-year"
              value={parseInt(movie.release_date) || ""}
              onChange={(e) => {
                const val = e.currentTarget.value;
                setMovie({ ...movie, release_date: val ? `${val}-01-01` : "" });
              }}
              placeholder="1990"
              max={2027}
              min={1990}
              className="rounded-xl border border-gray-600 p-2 font-light [&::-webkit-scrollbar]:hidden"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <label htmlFor="category">Movie Category</label>
            <select
              name="category"
              value={movie.category}
              onChange={(e) => {
                setMovie({
                  ...movie,
                  category: e.currentTarget.value as TMDBMovieResponse["category"],
                });
              }}
              className="rounded-xl border border-gray-600 p-2 font-light [&::-webkit-scrollbar]:hidden"
            >
              <option value="trending" style={{ backgroundColor: "#121212", color: "#ddd" }}>
                Trending
              </option>
              <option value="top-rated" style={{ backgroundColor: "#121212", color: "#ddd" }}>
                Top Rated
              </option>
            </select>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="top sticky -top-4 flex items-center justify-between border-b border-[#151517] bg-[#0d0c0f] py-2">
            <label htmlFor="movie-cast">Movie Set</label>
            <button
              onClick={(e) => {
                e.preventDefault();
                setMovie({
                  ...movie,
                  credits: {
                    cast: [
                      ...(movie?.credits?.cast ?? []),
                      { id: generateUniqueNumericId(), name: "", character: "", profile_path: "" },
                    ],
                  },
                });
              }}
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="grid gap-2">
            {movie?.credits?.cast.map((item, index) => (
              <CastBlock
                key={item.id}
                castInputRefs={castInputRefs}
                castAvatarRefs={castAvatarRefs}
                item={item}
                index={index}
                movie={movie}
                setMovie={setMovie}
              />
            ))}
          </div>
        </div>
      </form>
      <PreviewMovie previewing={previewing} movie={movie} />
      <div>
        <div className="fixed right-6 bottom-6 z-10 flex gap-2">
          <button
            onClick={previewMovie}
            className="flex items-center gap-1 rounded-xl bg-[#181818]/70 p-2 px-2.5 text-sm backdrop-blur-sm"
          >
            {previewing ? (
              <>
                Close Preview
                <EyeClosed size={18} />{" "}
              </>
            ) : (
              <>
                Preview movie
                <Eye size={18} />
              </>
            )}
          </button>
          <button
            onClick={publishMovie}
            className="flex items-center gap-1 rounded-xl bg-red-600/70 p-2 px-2.5 text-sm backdrop-blur-sm"
          >
            Add movie <CloudUpload size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
