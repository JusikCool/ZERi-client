import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import BottomTabBar from "./BottomTabBar";
import type { TabKey } from "./BottomTabBar";

function getActiveTab(pathname: string): TabKey {
  if (pathname.startsWith("/search")) return "search";
  if (pathname.startsWith("/record")) return "record";
  if (pathname.startsWith("/my")) return "my";
  return "home";
}

function AppLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <>
      {children}
      <BottomTabBar activeTab={getActiveTab(pathname)} />
    </>
  );
}

export default AppLayout;
