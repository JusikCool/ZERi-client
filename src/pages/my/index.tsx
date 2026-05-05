import DashboardStatsSection from "../../components/my/DashboardStatsSection";
import ModelStatusCard from "../../components/my/ModelStatusCard";
import MyHeader from "../../components/my/MyHeader";
import MyMenuSection from "../../components/my/MyMenuSection";
import UserSummaryCard from "../../components/my/UserSummaryCard";
import BottomTabBar from "../../components/ui/BottomTabBar";
import { mockMyData } from "../../data/mockMyData";

function MyPage() {
  const viewModel = {
    userName: mockMyData.user.name,
    summary: mockMyData.summary,
    stats: mockMyData.stats,
    modelStatus: mockMyData.modelStatus,
    menuItems: mockMyData.menuItems,
  };

  return (
    <div className="min-h-dvh bg-[#f2f4f6] px-4 pb-6 pt-6 text-slate-900 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[430px] flex-col overflow-hidden bg-[#f2f4f6]">
        <MyHeader title={`${viewModel.userName}님`} />
        <main className="flex-1 space-y-3 pb-8">
          <UserSummaryCard
            label={viewModel.summary.label}
            subtitle={viewModel.summary.subtitle}
            highlightedValue={viewModel.summary.highlightedValue}
            description={viewModel.summary.description}
          />
          <DashboardStatsSection stats={viewModel.stats} />
          <div className="pt-1">
            <ModelStatusCard status={viewModel.modelStatus} />
          </div>
          <div className="pt-1">
            <MyMenuSection items={viewModel.menuItems} />
          </div>
        </main>
        <BottomTabBar activeTab="my" />
      </div>
    </div>
  );
}

export default MyPage;
