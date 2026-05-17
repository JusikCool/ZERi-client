import { useCallback, useEffect, useRef, useState } from "react";
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const cursorRef = useRef<string | null>(null);
  const seen = useRef(new Set<string>());

  const dedup = useCallback(
    (historyItems: Awaited<ReturnType<typeof getHistory>>["items"]): RecordItem[] => {
      const newItems: RecordItem[] = [];
      for (const item of historyItems) {
        const key = `${item.ticker}_${item.queried_at.slice(0, 10)}`;
        if (seen.current.has(key)) continue;
        seen.current.add(key);
        newItems.push({
          id: String(item.analysis_id),
          symbol: item.ticker,
          korName: item.company_name_kr ?? item.ticker,
          grade: "OK",
          viewedAt: formatViewedAt(item.queried_at),
          price: formatPrice(parseDecimal(item.price_at_query) ?? 0),
          estimatedChangePercent: (parseDecimal(item.worst_case_pct) ?? 0) * 100,
          outcome: OUTCOME_MAP[item.outcome ?? "pending"] ?? "pending",
          outcomePercent: (parseDecimal(item.outcome_pct) ?? 0) * 100,
        });
      }
      return newItems;
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchInitial() {
      setLoading(true);
      setError(null);
      seen.current.clear();
      cursorRef.current = null;

      try {
        const { items: raw, nextCursor } = await getHistory(20);
        if (cancelled) return;
        const unique = dedup(raw);
        setItems(unique);
        cursorRef.current = nextCursor;
        setHasMore(nextCursor !== null);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof ApiClientError ? err.message : "기록을 불러오지 못했어요.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchInitial();
    return () => {
      cancelled = true;
    };
  }, [dedup]);

  const loadMore = useCallback(async () => {
    if (!cursorRef.current || loadingMore) return;
    setLoadingMore(true);

    try {
      let currentCursor: string | null = cursorRef.current;
      const accumulated: RecordItem[] = [];

      while (currentCursor && accumulated.length === 0) {
        const { items: raw, nextCursor } = await getHistory(20, currentCursor);
        const unique = dedup(raw);
        accumulated.push(...unique);
        currentCursor = nextCursor;
      }

      if (accumulated.length > 0) {
        setItems((prev) => [...prev, ...accumulated]);
      }
      cursorRef.current = currentCursor;
      setHasMore(currentCursor !== null);
    } catch {
      // loadMore 실패 시 조용히 처리 — hasMore 유지
    } finally {
      setLoadingMore(false);
    }
  }, [dedup, loadingMore]);

  return { items, loading, loadingMore, error, hasMore, loadMore };
}
