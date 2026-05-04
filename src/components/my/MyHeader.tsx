type MyHeaderProps = {
  title?: string;
  actionLabel?: string;
};

function MyHeader({
  title = "before",
  actionLabel = "설정",
}: MyHeaderProps) {
  return (
    <header className="flex items-center justify-between px-1 pb-6 pt-1">
      <span className="text-[1.375rem] font-bold tracking-[-0.04em] text-blue-500">
        {title}
      </span>
      <button
        type="button"
        aria-label={actionLabel}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-500 shadow-[0_6px_18px_rgba(15,23,42,0.06)]"
      >
        <span aria-hidden="true">+</span>
      </button>
    </header>
  );
}

export default MyHeader;
