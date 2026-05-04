import { useNavigate } from "react-router-dom";

export type TabKey = "home" | "search" | "watchlist" | "my";
type LegacyTabKey = TabKey | "profile";

type TabItem = {
  key: LegacyTabKey;
  label: string;
  href?: string;
  active?: boolean;
};

type BottomTabBarProps = {
  items?: TabItem[];
  activeTab?: LegacyTabKey;
};

const defaultItems: TabItem[] = [
  { key: "home", label: "홈", href: "/" },
  { key: "search", label: "탐색" },
  { key: "watchlist", label: "관심" },
  { key: "my", label: "마이", href: "/my" },
];

const tabIconMap: Record<LegacyTabKey, string> = {
  home: "⌂",
  search: "⌕",
  watchlist: "☆",
  my: "•",
  profile: "•",
};

function normalizeTabKey(key: LegacyTabKey): TabKey {
  return key === "profile" ? "my" : key;
}

function BottomTabBar({
  items = defaultItems,
  activeTab = "home",
}: BottomTabBarProps) {
  const navigate = useNavigate();
  const normalizedActiveTab = normalizeTabKey(activeTab);

  return (
    <nav
      aria-label="하단 탭 바"
      className="sticky bottom-0 mt-auto border-t border-slate-200/80 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+10px)] pt-2 backdrop-blur"
    >
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const itemKey = normalizeTabKey(item.key);
          const isActive = item.active ?? itemKey === normalizedActiveTab;

          return (
            <li key={item.key}>
              <button
                type="button"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  if (item.href) {
                    navigate(item.href);
                  }
                }}
                className={`flex w-full cursor-pointer flex-col items-center gap-1 px-2 py-2.5 text-[11px] font-medium ${
                  isActive ? "text-blue-500" : "text-slate-400"
                }`}
              >
                <span
                  className={`flex h-5 items-center justify-center text-sm ${
                    isActive ? "text-blue-500" : "text-slate-400"
                  }`}
                  aria-hidden="true"
                >
                  {tabIconMap[item.key]}
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomTabBar;
