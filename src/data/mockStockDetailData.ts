import type { StockDetailData } from "../types/stock";

export const mockStockDetailData: Record<string, StockDetailData> = {
  PLTR: {
    stock: {
      symbol: "PLTR",
      name: "Palantir",
      displayTitle: "PLTR Palantir",
    },
    riskSummary: {
      label: "위험 신호",
      warningText: "WARNING",
      horizonLabel: "30일 안 최악으로 가면",
      downsidePercent: -22,
      description:
        "평소 5% 확률 시나리오에서 도달 가능한 최저점이에요. 100번 중 5번은 이보다 더 떨어질 수 있어요.",
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
    reasonLink: {
      title: "왜 위험한지 알려드릴게요",
      description: "4가지 요인이 동시에 켜졌어요",
      href: "/stocks/PLTR/why",
    },
  },
};
