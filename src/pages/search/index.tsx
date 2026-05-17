import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchTickers } from "../../apis/modules/tickerApi";
import { ApiClientError } from "../../apis/error";
import type { TickerSearchItem } from "../../apis/types";

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-600",
  "bg-orange-100 text-orange-600",
  "bg-sky-100 text-sky-600",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-700",
];

function getAvatarClass(ticker: string): string {
  const idx = ticker.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function highlight(text: string, query: string) {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-blue-500">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TickerSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(async () => {
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

  const displayName = (item: TickerSearchItem) => item.company_name_kr ?? item.company_name;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] text-slate-900">
      <header className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로"
          className="shrink-0 text-slate-500"
        >
          <ChevronLeft size={22} strokeWidth={1.8} />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-white px-3 py-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          <Search size={15} className="shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="티커 또는 종목명 검색"
            className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-300"
            >
              <X size={11} strokeWidth={2.5} className="text-white" />
            </button>
          )}
        </div>
      </header>

      {query && (
        <main className="px-4 pb-28 pt-3">
          {loading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-slate-200" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-rose-50 px-4 py-3">
              <p className="text-sm text-rose-500">{error}</p>
            </div>
          ) : (
            <>
              <p className="mb-3 text-xs text-slate-400">검색 결과 · {results.length}건</p>
              {results.length > 0 ? (
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
                  {results.map((item, index) => (
                    <button
                      key={item.ticker}
                      type="button"
                      onClick={() => navigate(`/stocks/${item.ticker}`)}
                      className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-slate-50 ${
                        index < results.length - 1 ? "border-b border-slate-100" : ""
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[11px] font-bold ${getAvatarClass(item.ticker)}`}
                      >
                        {item.ticker}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-semibold text-slate-900">
                          {highlight(displayName(item), query)}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {item.company_name}
                          {item.sector ? ` · ${item.sector}` : ""}
                        </p>
                      </div>
                      <ChevronRight
                        size={16}
                        strokeWidth={1.8}
                        className="shrink-0 text-slate-300"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-slate-400">검색 결과가 없어요</p>
              )}
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default SearchPage;
