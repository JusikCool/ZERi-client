import { useEffect, useState } from "react";
import { searchTickers } from "../../apis/modules/tickerApi";
import { ApiClientError } from "../../apis/error";
import type { TickerSearchItem } from "../../apis/types";

export function useSearch(query: string) {
  const [results, setResults] = useState<TickerSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const items = await searchTickers(query.trim());
        setResults(items);
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : "검색 중 오류가 발생했어요.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading, error };
}
