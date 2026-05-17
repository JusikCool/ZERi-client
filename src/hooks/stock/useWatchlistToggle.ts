import { useCallback, useEffect, useState } from "react";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../../apis/modules/meApi";

export function useWatchlistToggle(ticker: string) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkWatchlist() {
      setLoading(true);
      try {
        const items = await getWatchlist();
        if (cancelled) return;
        setIsInWatchlist(items.some((item) => item.ticker === ticker));
      } catch {
        setIsInWatchlist(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    checkWatchlist();
    return () => {
      cancelled = true;
    };
  }, [ticker]);

  const toggle = useCallback(async () => {
    if (toggling) return;
    setToggling(true);
    const prev = isInWatchlist;
    setIsInWatchlist(!prev);
    try {
      if (prev) {
        await removeFromWatchlist(ticker);
      } else {
        await addToWatchlist(ticker);
      }
    } catch {
      setIsInWatchlist(prev);
    } finally {
      setToggling(false);
    }
  }, [ticker, isInWatchlist, toggling]);

  return { isInWatchlist, loading, toggling, toggle };
}
