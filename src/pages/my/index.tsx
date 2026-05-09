import { motion } from "framer-motion";
import ModelStatusCard from "../../components/my/ModelStatusCard";
import MyHeader from "../../components/my/MyHeader";
import MyMenuSection from "../../components/my/MyMenuSection";
import { mockMyData } from "../../data/mockMyData";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function MyPage() {
  const viewModel = {
    userName: mockMyData.user.name,
    summary: mockMyData.summary,
    stats: mockMyData.stats,
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
          <ModelStatusCard status={viewModel.modelStatus} />
        </motion.div>
        <motion.div variants={itemVariants} className="pt-1">
          <MyMenuSection items={viewModel.menuItems} />
        </motion.div>
      </motion.main>
    </div>
  );
}

export default MyPage;
