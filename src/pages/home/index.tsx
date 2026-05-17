import { useHome } from "../../hooks/home/useHome";
import HomeGreetingSection from "../../components/home/HomeGreetingSection";
import TodayRiskSection from "../../components/home/TodayRiskSection";
import WatchlistSection from "../../components/home/WatchlistSection";

function HomePage() {
  const { avatarChar, spotlight, watchlist, loading, error } = useHome();

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pt-6 text-slate-900 sm:py-8">
      <header className="flex items-center justify-between px-1 pb-4 pt-1">
        <a href="/" className="text-[1.375rem] font-bold tracking-[-0.04em] text-blue-500">
          before.
        </a>
        <button
          type="button"
          aria-label="프로필"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600"
        >
          {avatarChar}
        </button>
      </header>

      {loading ? (
        <div className="space-y-5 pb-28">
          <div className="h-5 w-40 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-52 animate-pulse rounded-[20px] bg-slate-200" />
          <div className="h-40 animate-pulse rounded-[20px] bg-slate-200" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center pt-24 text-center">
          <p className="text-sm font-medium text-slate-500">데이터를 불러오지 못했어요</p>
          <p className="mt-1 text-xs text-slate-400">잠시 후 다시 시도해주세요</p>
        </div>
      ) : (
        <main className="space-y-5 pb-28">
          <HomeGreetingSection />
          {spotlight ? (
            <TodayRiskSection risk={spotlight} />
          ) : (
            <div className="rounded-[20px] bg-white px-5 py-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
              <p className="text-sm font-medium text-slate-500">현재 위험 신호가 없어요</p>
              <p className="mt-1 text-xs text-slate-400">모든 종목이 안정적인 상태예요</p>
            </div>
          )}
          <WatchlistSection items={watchlist} />
        </main>
      )}
    </div>
  );
}

export default HomePage;
