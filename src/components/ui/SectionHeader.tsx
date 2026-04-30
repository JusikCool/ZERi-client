type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
};

function SectionHeader({ title, actionLabel }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-slate-500">{title}</h2>
      {actionLabel ? (
        <button
          type="button"
          className="text-xs font-medium text-slate-400"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default SectionHeader;
