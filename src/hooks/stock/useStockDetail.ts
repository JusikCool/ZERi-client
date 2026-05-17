import { useEffect, useState } from "react";
import { getRiskPath, getRiskVerdict } from "../../apis/modules/riskApi";
import { ApiClientError } from "../../apis/error";
import { parseDecimal } from "../../apis/utils";
import type { RiskGrade, FanChartData } from "../../types/stock";
import type { RiskGradeValue } from "../../apis/types";

const GRADE_MAP: Record<RiskGradeValue, RiskGrade> = {
  VOLATILITY_HIGH: "WARNING",
  VOLATILITY_MID: "CAUTION",
  VOLATILITY_LOW: "OK",
};

type StockDetailState = {
  title: string;
  grade: RiskGrade;
  downsidePercent: number;
  fanChart: FanChartData;
};

export function useStockDetail(ticker: string) {
  const [data, setData] = useState<StockDetailState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [verdict, path] = await Promise.all([
          getRiskVerdict(ticker, true),
          getRiskPath(ticker),
        ]);

        const currentPrice = parseDecimal(verdict.current_price) ?? path.q05_path[0] ?? 0;
        const downsidePercent = (parseDecimal(verdict.grade.worst_case_pct) ?? 0) * 100;
        const grade = GRADE_MAP[verdict.grade.value];

        const baseSec = new Date(path.base_date + "T00:00:00Z").getTime() / 1000;
        const DAY_SEC = 86400;

        const fanChart: FanChartData = {
          allHistory: [{ time: baseSec, value: currentPrice }],
          historicalQ05: [],
          q05Prices: [
            { time: baseSec, value: currentPrice },
            ...path.q05_path.map((value, i) => ({ time: baseSec + (i + 1) * DAY_SEC, value })),
          ],
          worstCasePercent: downsidePercent,
        };

        setData({
          title: `${ticker} ${verdict.company_name_kr ?? ""}`.trim(),
          grade,
          downsidePercent,
          fanChart,
        });
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : "데이터를 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [ticker]);

  return { data, loading, error };
}
