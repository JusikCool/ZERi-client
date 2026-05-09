import { Home, Search, AlignJustify, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type TabKey = "home" | "search" | "record" | "my";
type LegacyTabKey = TabKey | "watchlist" | "profile";

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
  { key: "search", label: "검색" },
  { key: "record", label: "기록" },
  { key: "my", label: "마이", href: "/my" },
];

const tabIconMap: Record<TabKey, LucideIcon> = {
  home: Home,
  search: Search,
  record: AlignJustify,
  my: User,
};

function normalizeTabKey(key: LegacyTabKey): TabKey {
  if (key === "watchlist") return "record";
  if (key === "profile") return "my";
  return key as TabKey;
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
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-107.5 -translate-x-1/2 border-t border-slate-200/60 bg-white px-3 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2"
    >
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const itemKey = normalizeTabKey(item.key);
          const isActive = item.active ?? itemKey === normalizedActiveTab;
          const Icon = tabIconMap[itemKey];

          return (
            <li key={item.key}>
              <button
                type="button"
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => {
                  if (item.href) navigate(item.href);
                }}
                className={`flex w-full cursor-pointer flex-col items-center gap-1 rounded-[14px] px-2 py-2.5 transition-colors active:bg-slate-50 ${
                  isActive ? "text-blue-500" : "text-slate-400"
                }`}
              >
                <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomTabBar;
