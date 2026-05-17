import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import type { RiskGrade, StockDetailData } from "../../types/stock";
import Card from "../ui/Card";

type RiskSummaryCardProps = {
  summary: StockDetailData["riskSummary"];
};

const gradeStyles: Record<RiskGrade, { dot: string; label: string; value: string }> = {
  WARNING: {
    dot: "bg-rose-400",
    label: "text-rose-500",
    value: "text-rose-500",
  },
  CAUTION: {
    dot: "bg-amber-400",
    label: "text-amber-500",
    value: "text-amber-500",
  },
  OK: {
    dot: "bg-emerald-400",
    label: "text-emerald-500",
    value: "text-emerald-500",
  },
};

function RiskSummaryCard({ summary }: RiskSummaryCardProps) {
  const styles = gradeStyles[summary.grade];

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${v.toFixed(2)}%`);

  useEffect(() => {
    const controls = animate(count, summary.downsidePercent, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.4,
    });
    return controls.stop;
  }, [count, summary.downsidePercent]);

  return (
    <Card className="space-y-5 rounded-3xl p-5 sm:p-6">
      <div className="space-y-2.5">
        <p className="text-sm font-medium text-slate-500">미래 30일 최악의 경우 예측 수익률</p>
        <motion.p
          className={`text-[3.95rem] font-extrabold leading-none tracking-[-0.03em] [font-variant-numeric:tabular-nums] ${styles.value}`}
        >
          {rounded}
        </motion.p>
      </div>
      <p className="text-[13px] leading-6 text-slate-500">
        투자 판단과 손실은 투자자 본인에게 귀속됩니다.
      </p>
    </Card>
  );
}

export default RiskSummaryCard;
