import HomeGreetingSection from "../../components/home/HomeGreetingSection";
import TodayRiskSection from "../../components/home/TodayRiskSection";
import WatchlistSection from "../../components/home/WatchlistSection";
import { mockHomeData } from "../../data/mockHomeData";

function HomePage() {
  const avatarChar = mockHomeData.userName.charAt(0);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pt-6 text-slate-900 sm:py-8">
      <header className="flex items-center justify-between px-1 pb-4 pt-1">
        <a
          href="/"
          className="text-[1.375rem] font-bold tracking-[-0.04em] text-blue-500"
        >
          before.
        </a>
        <button
          type="button"
          aria-label="?꾨줈??
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600"
        >
          {avatarChar}
        </button>
      </header>

      <main className="space-y-5 pb-28">
        <HomeGreetingSection />
        <TodayRiskSection risk={mockHomeData.todayRisk} />
        <WatchlistSection items={mockHomeData.watchlist} />
      </main>    </div>
  );
}

export default HomePage;

