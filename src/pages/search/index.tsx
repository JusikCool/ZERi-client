import { ChevronLeft, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResultItem from "../../components/search/SearchResultItem";
import { useSearch } from "../../hooks/search/useSearch";

function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { results, loading, error } = useSearch(query);

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
                    <SearchResultItem
                      key={item.ticker}
                      ticker={item.ticker}
                      companyName={item.company_name}
                      companyNameKr={item.company_name_kr}
                      sector={item.sector}
                      query={query}
                      isLast={index === results.length - 1}
                      onClick={() => navigate(`/stocks/${item.ticker}`)}
                    />
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
