import { motion } from "framer-motion";
import type { RiskReasonSeverity } from "../../types/risk";
import Card from "../ui/Card";

type RiskReasonItemProps = {
  title: string;
  description: string;
  severity: RiskReasonSeverity;
  percent: number;
};

function RiskReasonItem({ title, description, severity, percent }: RiskReasonItemProps) {
  const barColor = severity === "neutral" ? "bg-slate-300" : "bg-rose-400";

  return (
    <Card className="rounded-2xl p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[14px] font-semibold text-slate-900">{title}</p>
        <p
          className={`shrink-0 text-[14px] font-bold ${severity === "neutral" ? "text-slate-500" : "text-rose-500"}`}
        >
          {percent}%
        </p>
      </div>
      <div className="my-2.5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            delay: 0.2,
          }}
        />
      </div>
      <p className="text-[13px] leading-[1.55] text-slate-500">{description}</p>
    </Card>
  );
}

export default RiskReasonItem;
