function HomeGreetingSection() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  return (
    <section className="space-y-1">
      <p className="text-xs tracking-wide text-slate-400">
        TODAY · {month}월 {day}일
      </p>
      <p className="text-[1.25rem] font-bold leading-[1.2] tracking-[-0.03em] text-slate-900">
        오늘 가장 변동성이 큰 종목
      </p>
    </section>
  );
}

export default HomeGreetingSection;
