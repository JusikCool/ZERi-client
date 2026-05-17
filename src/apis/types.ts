export type DecimalString = string;

export type Meta = {
  request_id?: string | null;
  ts: string;
  next_cursor?: string | null;
};

export type ApiResponse<T> = {
  data: T;
  meta?: Meta;
};

export type TokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
  access_expires_at: string;
  refresh_expires_at: string;
};

export type UserPublic = {
  user_id: number;
  email: string;
  name: string;
  created_at: string;
};

export type BackendErrorEnvelope = {
  error: {
    state: string;
    code: string;
    message: string;
  };
};

export type ValidationErrorDetail = {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
};

export type HttpValidationError = {
  detail: ValidationErrorDetail[];
};

export type PartialUpdate<T> = Partial<T>;

export type WatchlistItem = {
  ticker: string;
  company_name: string;
  company_name_kr?: string | null;
  sector?: string | null;
  market_cap?: number | null;
  is_active: boolean;
  added_at: string;
};

export type RiskGradeValue = "VOLATILITY_HIGH" | "VOLATILITY_MID" | "VOLATILITY_LOW";

export type SpotlightItem = {
  ticker: string;
  company_name_kr?: string | null;
  grade: RiskGradeValue;
  message_code: string;
  worst_case_pct: DecimalString;
  current_price?: DecimalString | null;
  as_of: string;
};

export type SpotlightResponse = {
  spotlight?: SpotlightItem | null;
  headline_code: "HIGH_RISK_FOUND" | "ALL_QUIET";
};

export type RiskVerdictGradeSection = {
  value: RiskGradeValue;
  worst_case_pct: DecimalString;
  message_code: string;
};

export type RiskVerdictData = {
  ticker: string;
  company_name_kr?: string | null;
  current_price?: DecimalString | null;
  as_of: string;
  grade: RiskVerdictGradeSection;
  summary_narrative?: string | null;
  analysis_id?: number | null;
};

export type HistoryOutcomeCounts = {
  price_dropped: number;
  price_rose: number;
  flat: number;
  pending: number;
};

export type HistoryStats = {
  total_analyses: number;
  by_outcome: HistoryOutcomeCounts;
  by_grade_outcome: Record<string, unknown>;
};

export type TickerSearchItem = {
  ticker: string;
  company_name: string;
  company_name_kr?: string | null;
  sector?: string | null;
  market_cap?: number | null;
};

export type RiskXaiFeature = {
  feature: string;
  weight: number;
  label: string;
  description?: string | null;
};

export type RiskPathData = {
  ticker: string;
  base_date: string;
  horizon_days: number;
  q05_path: number[];
  q15_path: number[];
};

export type RiskAttentionData = {
  ticker: string;
  base_date: string;
  features: RiskXaiFeature[];
};
