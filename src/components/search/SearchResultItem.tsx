import { ChevronRight } from "lucide-react";

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-600",
  "bg-orange-100 text-orange-600",
  "bg-sky-100 text-sky-600",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-600",
  "bg-amber-100 text-amber-700",
];

function getAvatarClass(ticker: string): string {
  return AVATAR_COLORS[ticker.charCodeAt(0) % AVATAR_COLORS.length];
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

type SearchResultItemProps = {
  ticker: string;
  companyName: string;
  companyNameKr?: string | null;
  sector?: string | null;
  query: string;
  isLast: boolean;
  onClick: () => void;
};

function SearchResultItem({
  ticker,
  companyName,
  companyNameKr,
  sector,
  query,
  isLast,
  onClick,
}: SearchResultItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-slate-50 ${
        isLast ? "" : "border-b border-slate-100"
      }`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[11px] font-bold ${getAvatarClass(ticker)}`}
      >
        {ticker}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-slate-900">
          {highlight(companyNameKr ?? companyName, query)}
        </p>
        <p className="mt-0.5 text-xs text-slate-400">
          {companyName}
          {sector ? ` · ${sector}` : ""}
        </p>
      </div>
      <ChevronRight size={16} strokeWidth={1.8} className="shrink-0 text-slate-300" />
    </button>
  );
}

export default SearchResultItem;
