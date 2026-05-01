import type { SimilarCase } from "../../types/risk";
import StockAvatar from "./StockAvatar";

type SimilarCaseItemProps = {
  item: SimilarCase;
  isLast?: boolean;
};

function SimilarCaseItem({ item, isLast = false }: SimilarCaseItemProps) {
  return (
    <li
      className={`flex items-center justify-between gap-3 px-4 py-3.5 ${
        isLast ? "" : "border-b border-slate-100"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <StockAvatar symbol={item.symbol} />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-slate-900">
            {item.symbol}
          </p>
          <p className="truncate text-xs text-slate-400">
            {item.dateLabel} · 예측 {item.predictedPercent}%
          </p>
        </div>
      </div>
      <p className="shrink-0 text-[15px] font-semibold text-rose-500">
        {item.actualPercent}%
      </p>
    </li>
  );
}

export default SimilarCaseItem;
