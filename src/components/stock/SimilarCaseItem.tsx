import type { SimilarCase } from "../../types/risk";
import StockAvatar from "./StockAvatar";

type SimilarCaseItemProps = {
  item: SimilarCase;
  isLast?: boolean;
};

function SimilarCaseItem({ item, isLast = false }: SimilarCaseItemProps) {
  return (
    <li
      className={`flex min-h-[62px] items-center justify-between gap-3 px-4 py-3.5 ${
        isLast ? "" : "border-b border-slate-100/90"
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <StockAvatar symbol={item.symbol} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-slate-900">
            {item.symbol}
          </p>
          <p className="truncate text-xs font-medium text-slate-400">
            {item.dateLabel} {"\u00B7 \uC608\uCE21"} {item.predictedPercent}%
          </p>
        </div>
      </div>
      <p className="w-16 shrink-0 text-right text-[15px] font-bold text-rose-500 [font-variant-numeric:tabular-nums]">
        {item.actualPercent}%
      </p>
    </li>
  );
}

export default SimilarCaseItem;
