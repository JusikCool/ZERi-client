export type RiskReasonSeverity = "danger" | "warning" | "neutral";

export type RiskReason = {
  id: string;
  order: number;
  title: string;
  description: string;
  severity: RiskReasonSeverity;
  percent: number;
};

export type SummarySegment = {
  text: string;
  highlight?: boolean;
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
  summary: SummarySegment[];
  reasons: RiskReason[];
  similarCases: SimilarCase[];
};
