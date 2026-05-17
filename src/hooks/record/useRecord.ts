import { useEffect, useState } from "react";
import { getHistory } from "../../apis/modules/meApi";
import { ApiClientError } from "../../apis/error";
import { parseDecimal } from "../../apis/utils";
import type { RecordItem, RecordOutcome } from "../../mocks/mockRecordData";

const OUTCOME_MAP: Record<string, RecordOutcome> = {
  price_dropped: "down",
  price_rose: "up",
  flat: "flat",
  pending: "pending",
};

function formatViewedAt(queried_at: string): string {
  const d = new Date(queried_at);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${min} 조회`;
}

function formatPrice(value: number): string {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function useRecord() {
  const [items, setItems] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const historyItems = await getHistory(50);

        const seen = new Set<string>();
        const deduped = historyItems.filter((item) => {
          const key = `${item.ticker}_${item.queried_at.slice(0, 10)}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        setItems(
          deduped.map((item) => ({
            id: String(item.analysis_id),
            symbol: item.ticker,
            korName: item.company_name_kr ?? item.ticker,
            grade: "OK",
            viewedAt: formatViewedAt(item.queried_at),
            price: formatPrice(parseDecimal(item.price_at_query) ?? 0),
            estimatedChangePercent: (parseDecimal(item.worst_case_pct) ?? 0) * 100,
            outcome: OUTCOME_MAP[item.outcome ?? "pending"] ?? "pending",
            outcomePercent: (parseDecimal(item.outcome_pct) ?? 0) * 100,
          })),
        );
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : "기록을 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { items, loading, error };
}
