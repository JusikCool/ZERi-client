type StockDetailHeaderProps = {
  title: string;
  onBack: () => void;
};

function StockDetailHeader({ title, onBack }: StockDetailHeaderProps) {
  return (
    <header className="flex items-center gap-3 px-1 py-1">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로가기"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-700 shadow-[0_4px_12px_rgba(15,23,42,0.05)]"
      >
        ←
      </button>
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
    </header>
  );
}

export default StockDetailHeader;
