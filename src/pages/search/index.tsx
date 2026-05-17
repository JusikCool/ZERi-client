import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type StockSearchItem = {
  symbol: string;
  korName: string;
  companyName: string;
  sector: string;
};

const STOCK_LIST: StockSearchItem[] = [
  {
    symbol: "PLTR",
    korName: "팔란티어",
    companyName: "Palantir Technologies",
    sector: "Technology",
  },
  { symbol: "TSLA", korName: "테슬라", companyName: "Tesla, Inc.", sector: "Automotive" },
  { symbol: "NVDA", korName: "엔비디아", companyName: "NVIDIA Corporation", sector: "Technology" },
  { symbol: "AAPL", korName: "애플", companyName: "Apple Inc.", sector: "Technology" },
];

const avatarColors: Record<string, string> = {
  PLTR: "bg-rose-100 text-rose-600",
  TSLA: "bg-orange-100 text-orange-600",
  NVDA: "bg-sky-100 text-sky-600",
  AAPL: "bg-emerald-100 text-emerald-700",
};

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
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query
    ? STOCK_LIST.filter(
        (s) =>
          s.korName.includes(query) ||
          s.symbol.toLowerCase().includes(query.toLowerCase()) ||
          s.companyName.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

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
          <p className="mb-3 text-xs text-slate-400">검색 결과 · {results.length}건</p>
          {results.length > 0 && (
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
              {results.map((stock, index) => (
                <button
                  key={stock.symbol}
                  type="button"
                  onClick={() => navigate(`/stocks/${stock.symbol}`)}
                  className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-slate-50 ${
                    index < results.length - 1 ? "border-b border-slate-100" : ""
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[11px] font-bold ${
                      avatarColors[stock.symbol] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {stock.symbol}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-slate-900">
                      {highlight(stock.korName, query)}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {stock.companyName} · {stock.sector}
                    </p>
                  </div>
                  <ChevronRight size={16} strokeWidth={1.8} className="shrink-0 text-slate-300" />
                </button>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default SearchPage;
