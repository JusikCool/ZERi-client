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
    <section className="space-y-1 px-0.5">
      <h1 className="text-[1.9rem] font-bold leading-[1.25] tracking-[-0.04em] text-slate-900">
        {prefix}
        <br />
        <span className="text-rose-500">{highlight}</span>
        {suffix}
      </h1>
    </section>
  );
}

export default RiskReasonSummary;
