import type { ChartPoint, StockDetailData } from "../types/stock";

function tradingDayTimestamps(endDateStr: string, count: number): number[] {
  const result: number[] = [];
  const date = new Date(endDateStr + "T00:00:00Z");
  while (result.length < count) {
    const day = date.getUTCDay();
    if (day !== 0 && day !== 6) {
      result.unshift(date.getTime() / 1000);
    }
    date.setUTCDate(date.getUTCDate() - 1);
  }
  return result;
}

function calendarDayTimestamps(startDateStr: string, count: number): number[] {
  const date = new Date(startDateStr + "T00:00:00Z");
  return Array.from({ length: count }, () => {
    const ts = date.getTime() / 1000;
    date.setUTCDate(date.getUTCDate() + 1);
    return ts;
  });
}

function piecewisePrices(waypoints: [number, number][], count: number): number[] {
  const sorted = [...waypoints].sort((a, b) => a[0] - b[0]);
  return Array.from({ length: count }, (_, i) => {
    let loIdx = 0;
    for (let j = 0; j < sorted.length - 1; j++) {
      if (sorted[j][0] <= i) loIdx = j;
    }
    const hiIdx = loIdx < sorted.length - 1 ? loIdx + 1 : loIdx;
    const [loDay, loPrice] = sorted[loIdx];
    const [hiDay, hiPrice] = sorted[hiIdx];
    const base =
      loDay === hiDay
        ? loPrice
        : loPrice + (hiPrice - loPrice) * ((i - loDay) / (hiDay - loDay));
    const noise = Math.sin(i * 1.7) * 1.5 + Math.cos(i * 3.1) * 0.8;
    return Math.round((base + noise) * 10) / 10;
  });
}

// Last 25 trading days (known daily closes)
const PLTR_RECENT_25 = [
  93, 96, 100, 104, 108, 112, 116, 120, 118, 121, 119, 123, 126, 124, 122,
  119, 117, 115, 112, 110, 113, 111, 109, 108, 107,
];

// 227 trading days before the recent 25 (~May 2025 → early Apr 2026)
const pltrExtended227 = piecewisePrices(
  [
    [0, 55],
    [22, 60],
    [44, 65],
    [64, 70],
    [84, 72],
    [104, 68],
    [124, 75],
    [144, 82],
    [164, 87],
    [184, 90],
    [226, 93],
  ],
  227,
);

// Full 252-day daily history: 227 extended + 25 recent
const allTimes252 = tradingDayTimestamps("2026-05-07", 252);
const pltrAllHistory: ChartPoint[] = allTimes252.map((time, i) => ({
  time,
  value: i < 227 ? pltrExtended227[i] : PLTR_RECENT_25[i - 227],
}));

// Historical Q0.05: for each past trading day, the model's 30-day worst-case at that time
const pltrHistQ05: ChartPoint[] = pltrAllHistory.map((p, i) => ({
  time: p.time,
  value:
    Math.round(
      p.value *
        (0.76 + Math.sin(i * 0.5 + 1) * 0.025 + Math.cos(i * 0.8) * 0.015) *
        10,
    ) / 10,
}));

// Q0.05 projection: 31 calendar days from today, starting at last historicalQ05 (~84.8)
const PLTR_Q05_VALUES = [
  84.8, 84.8, 84.7, 84.7, 84.7, 84.6, 84.6, 84.6, 84.5, 84.5, 84.4, 84.4,
  84.3, 84.3, 84.2, 84.2, 84.1, 84.0, 84.0, 83.9, 83.9, 83.8, 83.8, 83.7,
  83.7, 83.6, 83.6, 83.6, 83.5, 83.5, 83.5,
];
const pltrProjTimes = calendarDayTimestamps("2026-05-07", 31);
const pltrQ05: ChartPoint[] = pltrProjTimes.map((time, i) => ({
  time,
  value: PLTR_Q05_VALUES[i],
}));

export const mockStockDetailData: Record<string, StockDetailData> = {
  PLTR: {
    stock: {
      symbol: "PLTR",
      name: "Palantir",
      displayTitle: "PLTR Palantir",
    },
    riskSummary: {
      label: "위험 신호",
      grade: "WARNING",

      downsidePercent: -22,
    },
    recommendation: {
      label: "제안",
      title: "매수 전 재검토하세요",
    },
    metrics: [
      {
        id: "similar-signals",
        label: "비슷한 신호",
        value: "3/4",
        helperText: "실제 하락",
        emphasis: "danger",
      },
      {
        id: "vix-index",
        label: "VIX 지수",
        value: "28.4",
        helperText: "↑ 평소 17-20",
        emphasis: "warning",
      },
    ],
    downsideRange: {
      minPercent: -22,
      midLabel: "중간",
      maxPercent: 12,
      currentPercent: -22,
      leftProbabilityLabel: "5% 확률",
      rightProbabilityLabel: "5% 확률",
    },
    fanChart: {
      allHistory: pltrAllHistory,
      historicalQ05: pltrHistQ05,
      q05Prices: pltrQ05,
      worstCasePercent: -22,
    },
    reasonLink: {
      href: "/stocks/PLTR/why",
    },
  },
};
