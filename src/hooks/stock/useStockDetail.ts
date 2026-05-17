import { useEffect, useState } from "react";
import { getRiskPath, getRiskVerdict } from "../../apis/modules/riskApi";
import { getPrices } from "../../apis/modules/pricesApi";
import { ApiClientError } from "../../apis/error";
import { parseDecimal } from "../../apis/utils";
import type { ChartPoint, FanChartData, RiskGrade } from "../../types/stock";
import type { RiskGradeValue } from "../../apis/types";

const GRADE_MAP: Record<RiskGradeValue, RiskGrade> = {
  VOLATILITY_HIGH: "WARNING",
  VOLATILITY_MID: "CAUTION",
  VOLATILITY_LOW: "OK",
};

function dateToSec(dateStr: string): number {
  return new Date(dateStr + "T00:00:00Z").getTime() / 1000;
}

function ratePathToPrices(rates: number[], basePrice: number, baseSec: number): ChartPoint[] {
  const DAY_SEC = 86400;
  return [
    { time: baseSec, value: basePrice },
    ...rates.map((rate, i) => ({
      time: baseSec + (i + 1) * DAY_SEC,
      value: basePrice * (1 + rate),
    })),
  ];
}

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
        const [verdict, path, priceItems] = await Promise.all([
          getRiskVerdict(ticker, true),
          getRiskPath(ticker),
          getPrices(ticker),
        ]);

        const downsidePercent = (parseDecimal(verdict.grade.worst_case_pct) ?? 0) * 100;
        const grade = GRADE_MAP[verdict.grade.value];

        // 실제 종가 히스토리 (날짜 오름차순 정렬)
        const sorted = [...priceItems].sort((a, b) => a.trade_date.localeCompare(b.trade_date));
        const allHistory: ChartPoint[] = sorted.map((p) => ({
          time: dateToSec(p.trade_date),
          value: p.close,
        }));

        const baseSec = dateToSec(path.base_date);
        const currentPrice =
          sorted.length > 0
            ? sorted[sorted.length - 1].close
            : (parseDecimal(verdict.current_price) ?? 0);

        // q05_path / q15_path 는 base_date 기준 수익률(rate) → 절대가격으로 변환
        const q05Prices = ratePathToPrices(path.q05_path, currentPrice, baseSec);
        const q15Prices = ratePathToPrices(path.q15_path, currentPrice, baseSec);

        const fanChart: FanChartData = {
          allHistory,
          historicalQ05: [],
          q05Prices,
          q15Prices,
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
