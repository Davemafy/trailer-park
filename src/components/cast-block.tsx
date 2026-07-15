import { ImageDown, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type CastBlockProps = {
  item: TMDBCast;
  castInputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  castAvatarRefs: React.RefObject<(HTMLInputElement | null)[]>;
  index: number;
  movie: TMDBMovieResponse;
  setMovie: React.Dispatch<React.SetStateAction<TMDBMovieResponse>>;
};

function CastBlock({
  item,
  castInputRefs,
  castAvatarRefs,
  index,
  movie,
  setMovie,
}: CastBlockProps) {
  const [avatarName, setAvatarName] = useState("");

  const data = movie?.credits?.cast.filter((current) => current.id === item.id)[index] ?? null;

  useEffect(() => {
    const node = castAvatarRefs.current[index];
    if (!node) return;

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target?.files?.[0];

      if (file) {
        setMovie((movie) => ({
          ...movie,
          credits: {
            cast: [
              ...(movie?.credits?.cast ?? []).map((current) => {
                if (current.id === item.id) {
                  return { ...current, profile_path: file };
                }
                return current;
              }),
            ],
          },
        }));
      }
    };

    node.addEventListener("change", handleChange);

    return () => node.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <div className="grid gap-2 rounded-2xl">
        <div className="flex justify-between">
          <label className="text-white">Cast {index + 1}</label>
          <button
            onClick={(e) => {
              e.preventDefault();
              setMovie({
                ...movie,
                credits: {
                  cast: [...(movie?.credits?.cast ?? []).filter((current) => current.id !== item.id)],
                },
              });
            }}
          >
            <Trash2 className="text-gray-400" size={16} />
          </button>
        </div>
        <div className="grid gap-3 rounded-2xl bg-[#3334] p-2 sm:flex">
          <input
            ref={(el) => {
              if(!el) return
              castInputRefs.current[index] = el;
            }}
            type="text"
            value={data?.name}
            onChange={(e) => {
              const value = e.currentTarget.value;
              setMovie((movie) => ({
                ...movie,
                credits: {
                  cast: [
                    ...(movie?.credits?.cast ?? []).map((current) => {
                      if (current.id === item.id) {
                        return { ...current, name: value };
                      }
                      return current;
                    }),
                  ],
                },
              }));
            }}
            placeholder="Name"
            id={`actor-${index + 1}-name`}
            name={`actor-${index + 1}-name`}
            className="flex-1 rounded-xl border border-gray-600 p-2 font-light"
          />
          <input
            type="text"
            name={`actor-${index + 1}-role`}
            onChange={(e) => {
              const value = e.currentTarget.value;

              setMovie((movie) => ({
                ...movie,
                credits: {
                  cast: [
                    ...(movie?.credits?.cast ?? []).map((current) => {
                      if (current.id === item.id) {
                        return { ...current, character: value };
                      }
                      return current;
                    }),
                  ],
                },
              }));
            }}
            value={data?.character}
            placeholder="Role"
            className="flex-1 rounded-xl border border-gray-600 p-2 font-light"
          />
          <div className="flex-col gap-2 overflow-hidden transition">
            <div className="hidden">
              <label htmlFor="course-image">Select an image:</label>
              <input
                ref={(el) => {
                  castAvatarRefs.current[index] = el;
                }}
                type="file"
                onChange={(e) => {
                  e.preventDefault();
                  const path = e.currentTarget.value.split("\\");
                  const fileName = path[path.length - 1];
                  setAvatarName(fileName);
                }}
                id="course-image"
                name="course-image"
                accept="image/*"
              />
            </div>
            <div className="flex gap-4 text-sm">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  castAvatarRefs.current[index] && castAvatarRefs.current[index].click();
                }}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-600 p-3 text-[#858586] hover:bg-neutral-900"
              >
                <p className="max-w-[15ch] truncate">{avatarName || "Avatar"}</p>
                <ImageDown className="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CastBlock;
