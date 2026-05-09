import type { RiskReasonData } from "../types/risk";

export const mockRiskReasonData: Record<string, RiskReasonData> = {
  PLTR: {
    stock: {
      symbol: "PLTR",
      name: "Palantir",
      displayTitle: "PLTR Palantir",
    },
    pageTitle: "상세 분석",
    summary: [
      { text: "최근 30거래일 동안 " },
      { text: "실현 변동성이 평소의 1.8배", highlight: true },
      { text: "로 관측되었고, 14일 RSI는 78로 통계적 과열 구간에 위치합니다. 현재 VIX " },
      { text: "24.3", highlight: true },
      { text: " 환경에서, 모델은 본 종목의 변동성을 과거 분포 상위 5% 구간으로 분류했습니다. 이는 통계적 관측치이며, 향후 가격 방향에 대한 예측이 아닙니다." },
    ],
    reasons: [
      {
        id: "volatility-spike",
        order: 1,
        title: "최근 30일 실현 변동성",
        description: "지난 30거래일 종가 표준편차가 평소보다 1.8배 높습니다.",
        severity: "danger",
        percent: 34,
      },
      {
        id: "rsi-overbought",
        order: 2,
        title: "단기 과열 지표 (RSI 14)",
        description: "14일 RSI가 78 — 통계적 과열 구간(>70)에 진입했습니다.",
        severity: "danger",
        percent: 21,
      },
      {
        id: "similar-signals",
        order: 3,
        title: "비슷한 신호 패턴",
        description: "2024-06 SOXL · 2024-11 TQQQ · 2025-04 SMCI · 2025-08 ARM",
        severity: "danger",
        percent: 28,
      },
      {
        id: "vix-up",
        order: 4,
        title: "VIX 시장 변동성",
        description: "시장 전체 변동성 28.4 (평소 17-20)",
        severity: "warning",
        percent: 17,
      },
    ],
    similarCases: [
      {
        id: "soxl-2024-06",
        symbol: "SOXL",
        dateLabel: "2024-06",
        predictedPercent: -20,
        actualPercent: -22,
      },
      {
        id: "tqqq-2024-11",
        symbol: "TQQQ",
        dateLabel: "2024-11",
        predictedPercent: -14,
        actualPercent: -15,
      },
      {
        id: "smci-2025-04",
        symbol: "SMCI",
        dateLabel: "2025-04",
        predictedPercent: -22,
        actualPercent: -31,
      },
      {
        id: "arm-2025-08",
        symbol: "ARM",
        dateLabel: "2025-08",
        predictedPercent: -16,
        actualPercent: -9,
      },
    ],
  },
};
