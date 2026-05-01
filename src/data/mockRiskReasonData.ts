import type { RiskReasonData } from "../types/risk";

export const mockRiskReasonData: Record<string, RiskReasonData> = {
  PLTR: {
    stock: {
      symbol: "PLTR",
      name: "Palantir",
      displayTitle: "PLTR Palantir",
    },
    pageTitle: "\uC65C \uC704\uD5D8\uD55C\uAC00\uC694?",
    summary: {
      prefix: "PLTR\uC5D0\uC11C 4\uAC00\uC9C0 \uC694\uC778\uC774",
      highlight: "\uBE68\uAC04\uBD88",
      suffix: "\uC744 \uCF30\uC5B4\uC694",
    },
    reasons: [
      {
        id: "volatility-spike",
        order: 1,
        title: "\uBCC0\uB3D9\uC131 \uD655\uB300",
        description:
          "\uCD5C\uADFC 10\uC77C \uBCC0\uB3D9\uC131\uC774 \uD3C9\uC18C \uB300\uBE44 2.3\uBC30 \uB192\uC544\uC9D0",
        severity: "danger",
      },
      {
        id: "earnings-soon",
        order: 2,
        title: "\uC2E4\uC801 \uC784\uBC15",
        description:
          "5\uC6D4 4\uC77C 1Q \uC2E4\uC801 \uBC1C\uD45C - \uAE30\uB300 \uC774\uC0C1 \uBCC0\uB3D9 \uAC00\uB2A5\uC131",
        severity: "warning",
      },
      {
        id: "similar-signals",
        order: 3,
        title: "\uBE44\uC2B7\uD55C \uC2E0\uD638 4\uAC74",
        description:
          "2024-06 SOXL \u00B7 2024-11 TQQQ \u00B7 2025-04 SMCI \u00B7 2025-08 ARM",
        severity: "danger",
      },
      {
        id: "vix-up",
        order: 4,
        title: "VIX \uC0C1\uC2B9",
        description:
          "\uC2DC\uC7A5 \uC804\uCCB4 \uBCC0\uB3D9\uC131 28.4 (\uD3C9\uC18C 17-20)",
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
