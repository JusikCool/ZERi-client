export type RecordGrade = "WARNING" | "CAUTION" | "OK";

export type RecordOutcome = "down" | "up" | "flat" | "pending";

export type RecordItem = {
  id: string;
  symbol: string;
  korName: string;
  grade: RecordGrade;
  viewedAt: string;
  price: string;
  estimatedChangePercent: number;
  outcome: RecordOutcome;
  outcomePercent: number;
};

export const mockRecordData: RecordItem[] = [
  {
    id: "1",
    symbol: "PLTR",
    korName: "팔란티어",
    grade: "WARNING",
    viewedAt: "2025.05.07 14:32 조회",
    price: "$23.40",
    estimatedChangePercent: -22.0,
    outcome: "down",
    outcomePercent: -11.8,
  },
  {
    id: "2",
    symbol: "NVDA",
    korName: "엔비디아",
    grade: "CAUTION",
    viewedAt: "2025.05.06 09:15 조회",
    price: "$845.10",
    estimatedChangePercent: -11.0,
    outcome: "up",
    outcomePercent: 6.8,
  },
  {
    id: "3",
    symbol: "AAPL",
    korName: "애플",
    grade: "OK",
    viewedAt: "2025.05.04 21:08 조회",
    price: "$191.80",
    estimatedChangePercent: -8.0,
    outcome: "flat",
    outcomePercent: 1.2,
  },
];
