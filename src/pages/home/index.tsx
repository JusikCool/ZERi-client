import { useEffect, useState } from "react";
import { getMe, getWatchlist } from "../../apis/modules/meApi";
import { getRiskVerdict, getSpotlight } from "../../apis/modules/riskApi";
import { parseDecimal } from "../../apis/utils";
import HomeGreetingSection from "../../components/home/HomeGreetingSection";
import TodayRiskSection from "../../components/home/TodayRiskSection";
import WatchlistSection from "../../components/home/WatchlistSection";
import type { StockRiskItem, TodayRisk } from "../../types/stock";

function HomePage() {
  const [avatarChar, setAvatarChar] = useState("?");
  const [spotlight, setSpotlight] = useState<TodayRisk | null>(null);
  const [watchlist, setWatchlist] = useState<StockRiskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [user, spotlightRes, watchlistItems] = await Promise.all([
          getMe(),
          getSpotlight("all"),
          getWatchlist(),
        ]);

        setAvatarChar(user.name.charAt(0));

        if (spotlightRes.spotlight) {
          const s = spotlightRes.spotlight;
          setSpotlight({
            stock: {
              symbol: s.ticker,
              name: s.company_name_kr ?? s.ticker,
              price: parseDecimal(s.current_price) ?? undefined,
            },
            riskLabel: "위험 신호",
            downsidePercent: (parseDecimal(s.worst_case_pct) ?? 0) * 100,
          });
        }

        const riskResults = await Promise.allSettled(
          watchlistItems.map((item) => getRiskVerdict(item.ticker, false)),
        );

        setWatchlist(
          watchlistItems.map((item, i) => {
            const result = riskResults[i];
            const pct =
              result.status === "fulfilled"
                ? (parseDecimal(result.value.grade.worst_case_pct) ?? 0) * 100
                : 0;
            return {
              symbol: item.ticker,
              name: item.company_name_kr ?? item.company_name,
              riskPercent: pct,
              periodLabel: "30일 최악",
            };
          }),
        );
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

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
          {spotlight && <TodayRiskSection risk={spotlight} />}
          <WatchlistSection items={watchlist} />
        </main>
      )}
    </div>
  );
}

export default HomePage;
