import type { MyMenuItemData } from "../../types/my";

type MyMenuItemProps = {
  item: MyMenuItemData;
  isLast?: boolean;
};

function MyMenuItem({ item, isLast = false }: MyMenuItemProps) {
  return (
    <li>
      <button
        type="button"
        aria-label={item.label}
        className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${
          isLast ? "" : "border-b border-slate-100"
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
          {item.iconLabel ?? item.label.slice(0, 2)}
        </div>
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">
            {item.label}
          </p>
          {item.description ? (
            <p className="truncate text-xs text-slate-400">{item.description}</p>
          ) : null}
        </div>
        <span aria-hidden="true" className="text-lg leading-none text-slate-300">
          &gt;
        </span>
      </button>
    </li>
  );
}

export default MyMenuItem;
