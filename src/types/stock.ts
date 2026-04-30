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
