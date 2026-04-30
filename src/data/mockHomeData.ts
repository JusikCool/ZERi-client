import type { HomeData } from "../types/stock";

export const mockHomeData: HomeData = {
  userName: "유진",
  todayRisk: {
    stock: {
      symbol: "PLTR",
      name: "Palantir",
      price: 24.18,
      changeRate: 3.2,
    },
    riskLabel: "위험 신호",
    signalSummary: "30일 안 최악",
    downsidePercent: -22,
    horizonLabel: "비슷한 신호 4번 중 3번 실제로 떨어졌어요",
    description: "비슷한 신호 4번 중 3번 실제로 떨어졌어요.",
  },
  watchlist: [
    {
      symbol: "PLTR",
      name: "Palantir",
      riskPercent: -22,
      periodLabel: "30일 최악",
    },
    {
      symbol: "TSLA",
      name: "Tesla",
      riskPercent: -18,
      periodLabel: "30일 최악",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA",
      riskPercent: -11,
      periodLabel: "30일 최악",
    },
    {
      symbol: "AAPL",
      name: "Apple",
      riskPercent: -6,
      periodLabel: "30일 최악",
    },
  ],
};
