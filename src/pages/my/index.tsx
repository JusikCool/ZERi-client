import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getHistoryStats, getMe } from "../../apis/modules/meApi";
import type { HistoryStats } from "../../apis/types";
import DashboardStatsSection from "../../components/my/DashboardStatsSection";
import LogoutButton from "../../components/my/LogoutButton";
import ModelStatusCard from "../../components/my/ModelStatusCard";
import MyHeader from "../../components/my/MyHeader";
import MyMenuSection from "../../components/my/MyMenuSection";
import { mockMyData } from "../../data/mockMyData";
import type { DashboardStat } from "../../types/my";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function buildStats(stats: HistoryStats): DashboardStat[] {
  const { total_analyses, by_outcome } = stats;
  const resolved = total_analyses - by_outcome.pending;
  const hitRate =
    resolved > 0 ? `${Math.round((by_outcome.price_dropped / resolved) * 100)}%` : "—";

  return [
    {
      id: "reviews",
      label: "재검토",
      value: String(total_analyses),
      helperText: "번",
      tone: "primary",
    },
    {
      id: "actual-downside",
      label: "실제 하락",
      value: String(by_outcome.price_dropped),
      helperText: "건",
      tone: "danger",
    },
    { id: "hit-rate", label: "적중률", value: hitRate, helperText: "최근 30일", tone: "success" },
  ];
}

function MyPage() {
  const [userName, setUserName] = useState<string>("");
  const [stats, setStats] = useState<DashboardStat[]>(mockMyData.stats);

  useEffect(() => {
    async function fetchData() {
      try {
        const [user, historyStats] = await Promise.all([getMe(), getHistoryStats()]);
        setUserName(user.name);
        setStats(buildStats(historyStats));
      } catch {
        // 실패 시 mock 데이터 유지
      }
    }
    fetchData();
  }, []);

  const viewModel = {
    userName: userName || mockMyData.user.name,
    stats,
    modelStatus: mockMyData.modelStatus,
    menuItems: mockMyData.menuItems,
  };

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pt-6 text-slate-900 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <MyHeader title={`${viewModel.userName}님`} />
      </motion.div>
      <motion.main
        className="space-y-3 pb-28"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
      >
        <motion.div variants={itemVariants} className="pt-1">
          <DashboardStatsSection stats={viewModel.stats} />
        </motion.div>
        <motion.div variants={itemVariants} className="pt-1">
          <ModelStatusCard status={viewModel.modelStatus} />
        </motion.div>
        <motion.div variants={itemVariants} className="pt-1">
          <MyMenuSection items={viewModel.menuItems} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <LogoutButton />
        </motion.div>
      </motion.main>
    </div>
  );
}

export default MyPage;
