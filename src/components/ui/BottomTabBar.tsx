type TabKey = "home" | "search" | "watchlist" | "profile";

type TabItem = {
  key: TabKey;
  label: string;
  active?: boolean;
};

type BottomTabBarProps = {
  items?: TabItem[];
};

const defaultItems: TabItem[] = [
  { key: "home", label: "홈", active: true },
  { key: "search", label: "검색" },
  { key: "watchlist", label: "관심" },
  { key: "profile", label: "나" },
];

const tabIconMap: Record<TabKey, string> = {
  home: "⌂",
  search: "⌕",
  watchlist: "♡",
  profile: "◦",
};

function BottomTabBar({ items = defaultItems }: BottomTabBarProps) {
  return (
    <nav
      aria-label="하단 탭바"
      className="sticky bottom-0 mt-auto border-t border-slate-200/80 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 backdrop-blur"
    >
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
              className={`flex w-full cursor-pointer flex-col items-center gap-1 px-2 py-2.5 text-[11px] font-medium ${
                item.active ? "text-blue-500" : "text-slate-400"
              }`}
            >
              <span
                className={`flex h-5 items-center justify-center text-sm ${
                  item.active ? "text-blue-500" : "text-slate-400"
                }`}
                aria-hidden="true"
              >
                {tabIconMap[item.key]}
              </span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default BottomTabBar;
