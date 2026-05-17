export const GRADE_LABEL: Record<string, string> = {
  VOLATILITY_HIGH: "높음",
  VOLATILITY_MID: "중간",
  VOLATILITY_LOW: "보통",
};

export const OUTCOME_LABEL: Record<string, string> = {
  price_dropped: "하락",
  price_rose: "상승",
  flat: "보합",
  pending: "평가 중",
};

export const HEADLINE_LABEL: Record<string, string> = {
  HIGH_RISK_FOUND: "위험 신호",
  ALL_QUIET: "안정",
};

export function gradeLabel(grade: string): string {
  return GRADE_LABEL[grade] ?? grade;
}

export function outcomeLabel(outcome: string): string {
  return OUTCOME_LABEL[outcome] ?? outcome;
}

export function headlineLabel(code: string): string {
  return HEADLINE_LABEL[code] ?? code;
}
