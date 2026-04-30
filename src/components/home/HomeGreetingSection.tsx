type HomeGreetingSectionProps = {
  userName: string;
  emphasisText: string;
  description: string;
};

function HomeGreetingSection({
  userName,
  emphasisText,
  description,
}: HomeGreetingSectionProps) {
  return (
    <section className="space-y-1.5">
      <p className="text-[1.9rem] font-bold leading-[1.18] tracking-[-0.04em] text-slate-900">
        {userName}님, <span className="text-rose-500">{emphasisText}</span>
      </p>
      <p className="text-[1.9rem] font-bold leading-[1.18] tracking-[-0.04em] text-slate-900">
        {description}
      </p>
    </section>
  );
}

export default HomeGreetingSection;
