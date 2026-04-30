import type { DownsideRange } from "../../types/stock";
import Card from "../ui/Card";

type DownsideRangeCardProps = {
  range: DownsideRange;
};

function DownsideRangeCard({ range }: DownsideRangeCardProps) {
  return (
    <Card className="space-y-4 p-4">
      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
        <span>30일 안 가능한 범위</span>
      </div>
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-rose-500">{range.minPercent}%</span>
        <span className="text-slate-400">{range.midLabel}</span>
        <span className="text-emerald-500">+{range.maxPercent}%</span>
      </div>
      <div className="space-y-2">
        <div className="relative h-3 rounded-full bg-gradient-to-r from-rose-200 via-slate-100 to-emerald-200">
          <div className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-rose-400 bg-white shadow-sm" />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{range.leftProbabilityLabel}</span>
          <span>{range.rightProbabilityLabel}</span>
        </div>
      </div>
    </Card>
  );
}

export default DownsideRangeCard;
