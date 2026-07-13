import { Plus } from "lucide-react";

const AddSeries = () => {
  return (
    <div>
      <form action="" className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="series-name">Series name</label>
          <input
            name="series-name"
            className="rounded-sm border border-gray-600 p-2 font-light"
            type="text"
            placeholder="i.e the Avengers, Merlin, Avalache 2..."
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="series-description">Series Description</label>
          <textarea
            name="series-description"
            className="rounded-sm border border-gray-600 p-2 font-light"
            rows={4}
            placeholder="Description.."
          ></textarea>
        </div>
        <div className="flex gap-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="series-rating">Series Rating</label>
            <input
              type="number"
              name="series-rating"
              placeholder="4.5"
              max={5}
              min={1}
              step={"0.1"}
              className="rounded-sm border border-gray-600 p-2 font-light"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <label htmlFor="series-year">Release Year</label>
            <input
              type="number"
              name="series-year"
              placeholder="2000"
              max={2027}
              min={1990}
              className="rounded-sm border border-gray-600 p-2 font-light [&::-webkit-scrollbar]:hidden"
            />
          </div>
        </div>
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <label htmlFor="series-cast">Series Set</label>
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="grid gap-2">
            <label>Cast 1</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Name"
                name="actor-1-name"
                className="flex-1 rounded-sm border border-gray-600 p-2 font-light"
              />
              <input
                type="text"
                name="actor-1-role"
                placeholder="Role"
                className="flex-1 rounded-sm border border-gray-600 p-2 font-light"
              />
            </div>
          </div>
        </div>

        <div>
          <input type="file" placeholder="series Banner" name="series-banner" id="" />
        </div>
      </form>
    </div>
  );
};

export default AddSeries;
