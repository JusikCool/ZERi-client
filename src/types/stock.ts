export type StockSummary = {
  symbol: string;
  name: string;
  displayName?: string;
  price?: number;
  changeRate?: number;
};

export type StockRiskItem = {
  symbol: string;
  name: string;
  riskPercent: number;
  periodLabel: string;
};

export type TodayRisk = {
  stock: StockSummary;
  riskLabel: string;
  signalSummary: string;
  downsidePercent: number;
  horizonLabel: string;
  description: string;
};

export type HomeData = {
  userName: string;
  todayRisk: TodayRisk;
  watchlist: StockRiskItem[];
};

export type RiskMetric = {
  id: string;
  label: string;
  value: string;
  helperText?: string;
  emphasis?: "danger" | "warning" | "neutral";
};

export type DownsideRange = {
  minPercent: number;
  midLabel: string;
  maxPercent: number;
  currentPercent: number;
  leftProbabilityLabel: string;
  rightProbabilityLabel: string;
};

export type StockDetailData = {
  stock: {
    symbol: string;
    name: string;
    displayTitle: string;
  };
  riskSummary: {
    label: string;
    warningText: string;
    horizonLabel: string;
    downsidePercent: number;
    description: string;
  };
  recommendation: {
    label: string;
    title: string;
  };
  metrics: RiskMetric[];
  downsideRange: DownsideRange;
  reasonLink: {
    title: string;
    description: string;
    href: string;
  };
};
