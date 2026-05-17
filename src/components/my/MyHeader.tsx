type MyHeaderProps = {
  title: string;
  email: string;
};

function MyHeader({ title, email }: MyHeaderProps) {
  return (
    <header className="flex items-center justify-between px-0.5 pb-4 pt-1">
      <div>
        <span className="text-[22px] font-bold tracking-[-0.03em] text-slate-900">{title}</span>
        {email && <p className="mt-0.5 text-[13px] text-slate-400">{email}</p>}
      </div>
    </header>
  );
}

export default MyHeader;
