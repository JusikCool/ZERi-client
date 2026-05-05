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
  { key: "home", label: "\uD648", href: "/" },
  { key: "search", label: "\uAC80\uC0C9" },
  { key: "watchlist", label: "\uAD00\uC2EC" },
  { key: "my", label: "\uB098", href: "/my" },
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
      aria-label="\uD558\uB2E8 \uD0ED \uBC14"
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
                className={`flex w-full cursor-pointer flex-col items-center gap-1 rounded-[14px] px-2 py-2.5 text-[11px] font-medium transition-colors active:bg-slate-50 ${
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
