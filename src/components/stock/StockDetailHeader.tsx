type StockDetailHeaderProps = {
  title: string;
  onBack: () => void;
};

function StockDetailHeader({ title, onBack }: StockDetailHeaderProps) {
  return (
    <header className="flex min-h-12 items-center gap-3 px-0.5">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-slate-100 bg-white text-base text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.05)] transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
      >
        ←
      </button>
      <h1 className="text-[17px] font-semibold tracking-[-0.02em] text-slate-900">
        {title}
      </h1>
    </header>
  );
}

export default StockDetailHeader;
