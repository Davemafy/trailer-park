import { ChevronLeft } from "lucide-react";

const AddCommunity = () => {
  return (
    <div>
      <header className="p-8">
        <div className="flex items-center gap-2">
          <ChevronLeft size={20} className="-mb-0.5 text-zinc-400" />
          <p className="text-base font-medium">Create Community</p>
        </div>
      </header>
      <div className="px-8">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className="flex w-10 text items-center justify-center rounded-full bg-[#d2162c] px-4 py-2 font-medium">
              1
            </span>
            <h3 className="text-base text-[#e0a29b]">Details</h3>
          </div>
          <div className="h-0.5 w-40bg-[#18191b]"></div>
          <div className="flex items-center gap-2 font-medium">
            <span className="flex w-10 text items-center justify-center rounded-full bg-[#26262b] px-4 py-2">
              2
            </span>
            <h3 className="text-base text-zinc-400">Settings</h3>
          </div>
          <div className="h-0.5 w-40 bg-[#18191b]"></div>
          <div className="flex items-center gap-2 font-medium">
            <span className="flex w-10 text items-center justify-center rounded-full bg-[#26262b] px-4 py-2">
              3
            </span>
            <h3 className="text-base text-zinc-400">Review</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCommunity;
