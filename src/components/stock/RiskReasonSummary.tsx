import type { SummarySegment } from "../../types/risk";
import Card from "../ui/Card";

type RiskReasonSummaryProps = {
  segments: SummarySegment[];
};

function RiskReasonSummary({ segments }: RiskReasonSummaryProps) {
  return (
    <Card className="rounded-2xl p-4">
      <p className="mb-2 text-xs font-medium text-slate-400">요약</p>
      <p className="text-[14px] leading-[1.7] text-slate-700">
        {segments.map((seg, i) =>
          seg.highlight ? (
            <strong key={i} className="font-bold text-rose-500">
              {seg.text}
            </strong>
          ) : (
            <span key={i}>{seg.text}</span>
          ),
        )}
      </p>
    </Card>
  );
}

export default RiskReasonSummary;
