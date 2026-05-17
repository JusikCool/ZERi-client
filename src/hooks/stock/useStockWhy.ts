import { useEffect, useState } from "react";
import { getRiskAttention, getRiskVerdict } from "../../apis/modules/riskApi";
import { ApiClientError } from "../../apis/error";
import type { RiskReason, RiskReasonSeverity, SummarySegment } from "../../types/risk";

function toSeverity(weight: number): RiskReasonSeverity {
  if (weight > 0.3) return "danger";
  if (weight > 0.15) return "warning";
  return "neutral";
}

type StockWhyState = {
  title: string;
  summary: SummarySegment[];
  reasons: RiskReason[];
};

export function useStockWhy(ticker: string) {
  const [data, setData] = useState<StockWhyState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [verdict, attention] = await Promise.all([
          getRiskVerdict(ticker),
          getRiskAttention(ticker),
        ]);

        const totalWeight = attention.features.reduce((sum, f) => sum + Math.abs(f.weight), 0);

        const reasons: RiskReason[] = attention.features.map((f, i) => ({
          id: f.feature,
          order: i + 1,
          title: f.label,
          description: f.description ?? "",
          severity: toSeverity(Math.abs(f.weight)),
          percent: totalWeight > 0 ? Math.round((Math.abs(f.weight) / totalWeight) * 100) : 0,
        }));

        const narrative = verdict.summary_narrative ?? "분석 요약 정보가 없습니다.";

        setData({
          title: `${ticker} ${verdict.company_name_kr ?? ""}`.trim(),
          summary: [{ text: narrative }],
          reasons,
        });
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : "데이터를 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [ticker]);

  return { data, loading, error };
}
