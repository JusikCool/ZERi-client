import HomeGreetingSection from "../../components/home/HomeGreetingSection";
import TodayRiskSection from "../../components/home/TodayRiskSection";
import WatchlistSection from "../../components/home/WatchlistSection";
import BottomTabBar from "../../components/ui/BottomTabBar";
import { mockHomeData } from "../../data/mockHomeData";

function HomePage() {
  return (
    <div className="min-h-dvh bg-[#f2f4f6] px-4 pb-6 pt-6 text-slate-900 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[430px] flex-col overflow-hidden bg-[#f2f4f6]">
        <header className="flex items-center justify-between px-1 pb-6 pt-1">
          <span className="text-[1.375rem] font-bold tracking-[-0.04em] text-blue-500">
            before
          </span>
          <button
            type="button"
            aria-label="설정"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-[0_6px_18px_rgba(15,23,42,0.06)]"
          >
            ✦
          </button>
        </header>
        <main className="flex-1 space-y-7 pb-6">
          <HomeGreetingSection
            userName={mockHomeData.userName}
            emphasisText="잠깐!"
            description="오늘 위험한 종목이 있어요"
          />
          <TodayRiskSection risk={mockHomeData.todayRisk} />
          <WatchlistSection items={mockHomeData.watchlist} />
        </main>
        <BottomTabBar activeTab="home" />
      </div>
    </div>
  );
}

export default HomePage;
