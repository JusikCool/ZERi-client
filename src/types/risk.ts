export type RiskReasonSeverity = "danger" | "warning" | "neutral";

export type RiskReason = {
  id: string;
  order: number;
  title: string;
  description: string;
  severity: RiskReasonSeverity;
};

export type SimilarCase = {
  id: string;
  symbol: string;
  dateLabel: string;
  predictedPercent: number;
  actualPercent: number;
};

export type RiskReasonData = {
  stock: {
    symbol: string;
    name: string;
    displayTitle: string;
  };
  pageTitle: string;
  summary: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  reasons: RiskReason[];
  similarCases: SimilarCase[];
};
