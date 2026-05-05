type MyHeaderProps = {
  title?: string;
  actionLabel?: string;
};

function MyHeader({ title = "유진님", actionLabel = "설정" }: MyHeaderProps) {
  return (
    <header className="flex items-center justify-between px-0.5 pb-4 pt-1">
      <span className="text-[22px] font-bold tracking-[-0.03em] text-slate-900">
        {title}
      </span>
    </header>
  );
}

export default MyHeader;
