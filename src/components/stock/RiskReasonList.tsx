import type { RiskReason } from "../../types/risk";
import RiskReasonItem from "./RiskReasonItem";

type RiskReasonListProps = {
  reasons: RiskReason[];
};

function RiskReasonList({ reasons }: RiskReasonListProps) {
  return (
    <section className="space-y-2.5">
      <div className="flex items-center justify-between px-0.5">
        <p className="text-[15px] font-semibold text-slate-900">핵심 영향 변수</p>
        <p className="text-xs text-slate-400">{reasons.length}개 변수</p>
      </div>
      {reasons.map((reason) => (
        <RiskReasonItem
          key={reason.id}
          title={reason.title}
          description={reason.description}
          severity={reason.severity}
          percent={reason.percent}
        />
      ))}
    </section>
  );
}

export default RiskReasonList;
