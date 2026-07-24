import { useSidebar } from "@/hooks/use-sidebar";
import { Menu, X } from "lucide-react";
import comingSoonPath from "../../assets/img/coming-soon.png";
import twitterLogo from "../../assets/img/twitter.svg";
import instagramLogo from "../../assets/img/instagram.svg";
import discordLogo from "../../assets/img/discord.svg";
import { toast } from "sonner";
import { useState } from "react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");

  const { sidebarOpen, setSidebarOpen } = useSidebar();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.success("You have been added on the waitlist");

    setEmail("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-[#151517] p-6 py-6 sm:py-4">
        <h1 className="text-base font-semibold">Coming Soon</h1>
        <button
          onClick={() => alert("Coming soon!")}
          className="hidden rounded-full bg-neutral-900 p-2 px-5 text-sm md:block"
        >
          Get Alerted
        </button>

        <button className="block md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {!sidebarOpen && <Menu size={20} className="fill-[#9698P99] hover:fill-white" />}
          {sidebarOpen && <X size={20} className="fill-[#9698P99] hover:fill-white" />}
        </button>
      </div>
      <div className="flex h-full flex-wrap gap-4 overflow-y-auto px-5 py-10 [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <img className="w-full max-w-[30rem]" src={comingSoonPath} alt="" />
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-3xl font-semibold sm:text-4xl">Coming Soon</h1>
              <p className="text-sm text-zinc-400">
                Were building something amazing for our community. Stay tuned and be the first to
                know when we launch!
              </p>
            </div>
          </div>
          <div className="xs:flex grid place-items-center items-center justify-center gap-2">
            <div className="xs:w-14 flex w-30 flex-col items-center justify-center gap-3 rounded-md border border-[#1c1b1d] bg-[#151416] py-3 sm:h-22 sm:w-30">
              <h3 className="text-xl font-semibold text-[#ca1b29] sm:text-3xl">12</h3>
              <span className="text-[11px] sm:text-xs">Days</span>
            </div>
            <span className="text-xl font-medium hidden xs:block">:</span>
            <div className="xs:w-14 flex w-30 flex-col items-center justify-center gap-3 rounded-md border border-[#1c1b1d] bg-[#151416] py-3 sm:h-22 sm:w-30">
              <h3 className="text-xl font-semibold text-[#ca1b29] sm:text-3xl">08</h3>
              <span className="text-[11px] sm:text-xs">Hours</span>
            </div>
            <span className="text-xl font-medium hidden xs:block">:</span>
            <div className="xs:w-14 flex w-30 flex-col items-center justify-center gap-3 rounded-md border border-[#1c1b1d] bg-[#151416] py-3 sm:h-22 sm:w-30">
              <h3 className="text-xl font-semibold text-[#ca1b29] sm:text-3xl">34</h3>
              <span className="text-[11px] sm:text-xs">Minutes</span>
            </div>
            <span className="text-xl font-medium hidden xs:block">:</span>
            <div className="xs:w-14 flex w-30 flex-col items-center justify-center gap-3 rounded-md border border-[#1c1b1d] bg-[#151416] py-3 sm:h-22 sm:w-30">
              <h3 className="text-xl font-semibold text-[#ca1b29] sm:text-3xl">56</h3>
              <span className="text-[11px] sm:text-xs">Seconds</span>
            </div>
          </div>
          <div className="flex flex-col pt-2 items-center justify-center gap-4">
            <p className="text-center text-xs leading-5 text-zinc-400">
              Want to be notified? <br /> We'll let you know when it's ready
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                className="rounded-md border border-[#1c1b1d] bg-[#151416] p-2 px-4 text-sm"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                name="email"
                placeholder="Enter your email address"
              />
              <button className="shrink-0 rounded-md bg-[#b41c2a] p-2 px-4 text-sm">
                Notify me
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-zinc-400">Follow us for updates</p>
            <div className="flex gap-4">
              <img src={twitterLogo} className="h-5" alt="twitter" />
              <img src={instagramLogo} className="h-5" alt="twitter" />
              <img src={discordLogo} className="h-5" alt="twitter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
