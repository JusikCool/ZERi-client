import type { RiskReasonData } from "../types/risk";

export const mockRiskReasonData: Record<string, RiskReasonData> = {
  PLTR: {
    stock: {
      symbol: "PLTR",
      name: "Palantir",
      displayTitle: "PLTR Palantir",
    },
    pageTitle: "왜 위험한가요?",
    summary: {
      prefix: "PLTR에서 4가지 요인이 동시에",
      highlight: "빨간불",
      suffix: "을 켰어요",
    },
    reasons: [
      {
        id: "volatility-spike",
        order: 1,
        title: "변동성 확대",
        description: "최근 10일 변동성이 평소 대비 2.3배 높아짐",
        severity: "danger",
      },
      {
        id: "earnings-soon",
        order: 2,
        title: "실적 임박",
        description: "5월 4일 1Q 실적 발표 - 기대 이상 변동 가능성",
        severity: "warning",
      },
      {
        id: "similar-signals",
        order: 3,
        title: "비슷한 신호 4건",
        description: "2024-06 SOXL · 2024-11 TQQQ · 2025-04 SMCI · 2025-08 ARM",
        severity: "danger",
      },
      {
        id: "vix-up",
        order: 4,
        title: "VIX 상승",
        description: "시장 전체 변동성 28.4 (평소 17-20)",
        severity: "warning",
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
