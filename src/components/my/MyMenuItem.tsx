import { useNavigate } from "react-router-dom";
import type { MyMenuItemData } from "../../types/my";

type MyMenuItemProps = {
  item: MyMenuItemData;
  isLast?: boolean;
};

const badgeToneMap: Record<string, string> = {
  notifications: "bg-blue-50 text-blue-600",
  watchlist: "bg-slate-100 text-slate-600",
  reports: "bg-emerald-50 text-emerald-600",
  support: "bg-amber-50 text-amber-600",
};

function MyMenuItem({ item, isLast = false }: MyMenuItemProps) {
  const navigate = useNavigate();
  const iconText = item.iconLabel?.slice(0, 1) ?? item.label.slice(0, 1);
  const badgeTone = badgeToneMap[item.id] ?? "bg-slate-100 text-slate-600";

  return (
    <li>
      <button
        type="button"
        aria-label={item.label}
        onClick={() => {
          if (item.href) {
            navigate(item.href);
          }
        }}
        className={`flex min-h-[66px] w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors active:bg-slate-50 ${
          isLast ? "" : "border-b border-slate-100"
        }`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${badgeTone}`}
        >
          {iconText}
        </div>
        <div className="min-w-0 flex-1 space-y-0.5 pr-2">
          <p className="text-[14px] font-semibold tracking-[-0.02em] text-slate-900">
            {item.label}
          </p>
          {item.description ? (
            <p className="text-[12px] leading-[1.4] text-slate-500">
              {item.description}
            </p>
          ) : null}
        </div>
        <span aria-hidden="true" className="text-base leading-none text-slate-400">
          →
        </span>
      </button>
    </li>
  );
}

export default MyMenuItem;
