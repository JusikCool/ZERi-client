import type { RecordItem } from "../../mocks/mockRecordData";

type Props = { item: RecordItem };

const avatarColors: Record<string, string> = {
  PLTR: "bg-rose-100 text-rose-600",
  TSLA: "bg-orange-100 text-orange-600",
  NVDA: "bg-sky-100 text-sky-600",
  AAPL: "bg-emerald-100 text-emerald-700",
};

const outcomeConfig = {
  down: { prefix: "하락", color: "text-rose-500" },
  up: { prefix: "상승", color: "text-blue-500" },
  flat: { prefix: "보합", color: "text-slate-400" },
};

function RecordItemCard({ item }: Props) {
  const avatar = avatarColors[item.symbol] ?? "bg-slate-100 text-slate-600";
  const outcome = outcomeConfig[item.outcome];
  const sign = item.outcomePercent >= 0 ? "+" : "";

  return (
    <div className="rounded-2xl bg-white px-4 py-4 shadow-[0_2px_12px_rgba(15,23,42,0.06)]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[11px] font-bold ${avatar}`}
        >
          {item.symbol}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-semibold text-slate-900">{item.korName}</span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">{item.viewedAt}</p>
        </div>
      </div>

      <div className="mt-3.5 grid grid-cols-3 divide-x divide-slate-100">
        <div className="pr-4 text-center">
          <p className="text-[10px] text-slate-400">조회 시점 종가</p>
          <p className="mt-0.5 text-[13px] font-semibold text-slate-700">{item.price}</p>
        </div>
        <div className="px-4 text-center">
          <p className="text-[10px] text-slate-400">현재 변동</p>
          <p className="mt-0.5 text-[13px] font-semibold text-rose-500">
            {item.estimatedChangePercent}%
          </p>
        </div>
        <div className="pl-4 text-center">
          <p className="text-[10px] text-slate-400">30일 예측 수익률</p>
          <p className={`mt-0.5 text-[13px] font-semibold ${outcome.color}`}>
            {outcome.prefix} {sign}
            {item.outcomePercent}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecordItemCard;
