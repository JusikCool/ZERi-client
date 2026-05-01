import type { RiskReason } from "../../types/risk";
import RiskReasonItem from "./RiskReasonItem";

type RiskReasonListProps = {
  reasons: RiskReason[];
};

function RiskReasonList({ reasons }: RiskReasonListProps) {
  return (
    <section className="space-y-3">
      {reasons.map((reason) => (
        <RiskReasonItem
          key={reason.id}
          index={reason.order}
          title={reason.title}
          description={reason.description}
          severity={reason.severity}
        />
      ))}
    </section>
  );
}

export default RiskReasonList;
