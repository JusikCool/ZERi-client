type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  className?: string;
  titleClassName?: string;
  actionClassName?: string;
};

function SectionHeader({
  title,
  actionLabel,
  className = "",
  titleClassName = "",
  actionClassName = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between ${className}`.trim()}>
      <h2
        className={`text-sm font-semibold text-slate-500 ${titleClassName}`.trim()}
      >
        {title}
      </h2>
      {actionLabel ? (
        <button
          type="button"
          className={`text-xs font-medium text-slate-400 ${actionClassName}`.trim()}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

export default SectionHeader;
