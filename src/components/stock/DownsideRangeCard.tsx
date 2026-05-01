import type { CSSProperties } from "react";
import type { DownsideRange } from "../../types/stock";
import Card from "../ui/Card";

type DownsideRangeCardProps = {
  range: DownsideRange;
};

function DownsideRangeCard({ range }: DownsideRangeCardProps) {
  const rawPercent =
    ((range.currentPercent - range.minPercent) /
      (range.maxPercent - range.minPercent)) *
    100;
  const markerPercent = Math.max(10, Math.min(90, rawPercent));
  const markerStyle = {
    left: `${markerPercent}%`,
  } satisfies CSSProperties;

  return (
    <Card className="space-y-4 rounded-[20px] p-4">
      <p className="text-xs font-medium text-slate-400">30일 안 가능한 범위</p>
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-rose-500">{range.minPercent}%</span>
        <span className="text-slate-400">{range.midLabel}</span>
        <span className="text-emerald-500">+{range.maxPercent}%</span>
      </div>
      <div className="space-y-2.5">
        <div className="relative h-3 rounded-full bg-gradient-to-r from-rose-300 via-rose-50 via-40% to-emerald-300">
          <div className="absolute inset-y-0 left-0 w-full rounded-full bg-[linear-gradient(90deg,rgba(248,113,113,0.22)_0%,rgba(255,255,255,0.72)_46%,rgba(74,222,128,0.26)_100%)]" />
          <div
            style={markerStyle}
            className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-rose-400 bg-white shadow-[0_4px_10px_rgba(239,68,68,0.15)]"
          >
            <div className="absolute inset-1 rounded-full bg-rose-400" />
          </div>
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
