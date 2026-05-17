type StockDetailHeaderProps = {
  title: string;
  onBack: () => void;
  backAriaLabel?: string;
  watchlisted?: boolean;
  watchlistLoading?: boolean;
  onToggleWatchlist?: () => void;
};

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function StockDetailHeader({
  title,
  onBack,
  backAriaLabel = "뒤로가기",
  watchlisted = false,
  watchlistLoading = false,
  onToggleWatchlist,
}: StockDetailHeaderProps) {
  return (
    <header className="flex min-h-12 items-center gap-3 px-0.5">
      <button
        type="button"
        onClick={onBack}
        aria-label={backAriaLabel}
        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-100 bg-white text-base text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.05)] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
      >
        <span aria-hidden="true">&lt;</span>
      </button>
      <h1 className="flex-1 text-[17px] font-semibold tracking-[-0.02em] text-slate-900">
        {title}
      </h1>
      {onToggleWatchlist && (
        <button
          type="button"
          onClick={onToggleWatchlist}
          disabled={watchlistLoading}
          aria-label={watchlisted ? "관심종목 제거" : "관심종목 추가"}
          className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-100 bg-white shadow-[0_4px_12px_rgba(15,23,42,0.05)] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 disabled:opacity-50 ${watchlisted ? "text-rose-500" : "text-slate-300"}`}
        >
          <HeartIcon filled={watchlisted} />
        </button>
      )}
    </header>
  );
}

export default StockDetailHeader;
