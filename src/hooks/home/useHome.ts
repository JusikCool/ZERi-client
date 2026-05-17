import { useEffect, useState } from "react";
import { getMe, getWatchlist } from "../../apis/modules/meApi";
import { getRiskVerdict, getSpotlight } from "../../apis/modules/riskApi";
import { parseDecimal } from "../../apis/utils";
import { useAuthStore } from "../../stores/authStore";
import type { StockRiskItem, TodayRisk } from "../../types/stock";

type HomeData = {
  avatarChar: string;
  spotlight: TodayRisk | null;
  watchlist: StockRiskItem[];
};

export function useHome() {
  const { setUser } = useAuthStore();
  const [data, setData] = useState<HomeData>({ avatarChar: "?", spotlight: null, watchlist: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [user, watchlistItems] = await Promise.all([getMe(), getWatchlist()]);
        setUser(user);

        const scope = watchlistItems.length > 0 ? "watchlist" : "all";
        const spotlightRes = await getSpotlight(scope);

        let spotlight: TodayRisk | null = null;
        if (spotlightRes.spotlight) {
          const s = spotlightRes.spotlight;
          spotlight = {
            stock: {
              symbol: s.ticker,
              name: s.company_name_kr ?? s.ticker,
              price: parseDecimal(s.current_price) ?? undefined,
            },
            riskLabel: "위험 신호",
            downsidePercent: (parseDecimal(s.worst_case_pct) ?? 0) * 100,
          };
        }

        const riskResults = await Promise.allSettled(
          watchlistItems.map((item) => getRiskVerdict(item.ticker, false)),
        );

        const watchlist: StockRiskItem[] = watchlistItems.map((item, i) => {
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
        });

        setData({ avatarChar: user.name.charAt(0), spotlight, watchlist });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setUser]);

  return { ...data, loading, error };
}
