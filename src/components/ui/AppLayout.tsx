import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BottomTabBar from "./BottomTabBar";
import type { TabKey } from "./BottomTabBar";

function getActiveTab(pathname: string): TabKey {
  if (pathname.startsWith("/search")) return "search";
  if (pathname.startsWith("/record")) return "record";
  if (pathname.startsWith("/my")) return "my";
  return "home";
}

function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Outlet />
      <BottomTabBar activeTab={getActiveTab(pathname)} />
    </>
  );
}

export default AppLayout;
