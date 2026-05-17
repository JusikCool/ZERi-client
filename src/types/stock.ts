export type RiskGrade = "WARNING" | "CAUTION" | "OK";

export type ChartPoint = {
  time: number;
  value: number;
};

export type FanChartPeriod = "D" | "W" | "M";

export type FanChartData = {
  allHistory: ChartPoint[];
  historicalQ05: ChartPoint[];
  q05Prices: ChartPoint[];
  q15Prices?: ChartPoint[];
  worstCasePercent: number;
};

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
  downsidePercent: number;
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
    grade: RiskGrade;
    downsidePercent: number;
  };
  recommendation: {
    label: string;
    title: string;
  };
  metrics: RiskMetric[];
  downsideRange: DownsideRange;
  fanChart: FanChartData;
  reasonLink: {
    href: string;
  };
};
