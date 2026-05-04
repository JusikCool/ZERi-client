import type { ModelStatus } from "../../types/my";
import Card from "../ui/Card";

type ModelStatusCardProps = {
  status: ModelStatus;
};

const badgeClassNameMap: Record<ModelStatus["status"], string> = {
  normal: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-rose-50 text-rose-500",
};

function ModelStatusCard({ status }: ModelStatusCardProps) {
  return (
    <Card className="rounded-[20px] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-sm font-semibold text-slate-900">{status.title}</p>
          <p className="text-sm leading-5 text-slate-500">{status.description}</p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClassNameMap[status.status]}`}
        >
          {status.statusLabel}
        </span>
      </div>
    </Card>
  );
}

export default ModelStatusCard;
