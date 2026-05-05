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
  const descriptionParts = status.description.split(status.statusLabel);

  return (
    <Card className="rounded-[18px] p-4 shadow-[0_8px_22px_rgba(15,23,42,0.03)]">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[14px] font-semibold tracking-[-0.02em] text-slate-900">
            {status.title}
          </p>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[10px] font-semibold ${badgeClassNameMap[status.status]}`}
          >
            <span
              aria-hidden="true"
              className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500"
            />
            {status.statusLabel}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-[12px] leading-[1.45] text-slate-500">
            {descriptionParts.length > 1 ? (
              <>
                {descriptionParts[0]}
                <span className="font-medium text-emerald-600">
                  {status.statusLabel}
                </span>
                {descriptionParts.slice(1).join(status.statusLabel)}
              </>
            ) : (
              status.description
            )}
          </p>
          {status.metricsText ? (
            <p className="text-[11px] leading-[1.4] text-slate-400">
              {status.metricsText}
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export default ModelStatusCard;
