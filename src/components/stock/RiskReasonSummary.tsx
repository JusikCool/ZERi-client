type RiskReasonSummaryProps = {
  prefix: string;
  highlight: string;
  suffix: string;
};

function RiskReasonSummary({
  prefix,
  highlight,
  suffix,
}: RiskReasonSummaryProps) {
  return (
    <section className="px-0.5 pt-1.5">
      <h1 className="max-w-[17ch] text-[1.38rem] font-bold leading-[1.32] tracking-[-0.02em] text-slate-900 sm:text-[1.45rem]">
        {prefix}
        <br />
        {"\uB3D9\uC2DC\uC5D0 "}
        <span className="font-bold text-rose-500">{highlight}</span>
        {suffix}
      </h1>
    </section>
  );
}

export default RiskReasonSummary;
