import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getMe } from "../../apis/modules/meApi";
import LogoutButton from "../../components/my/LogoutButton";
import ModelStatusCard from "../../components/my/ModelStatusCard";
import MyHeader from "../../components/my/MyHeader";
import MyMenuSection from "../../components/my/MyMenuSection";
import { mockMyData } from "../../data/mockMyData";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

function MyPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getMe();
        setUserName(user.name);
        setEmail(user.email);
      } catch {
        // 실패 시 mock 유지
      }
    }
    fetchData();
  }, []);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pt-6 text-slate-900 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <MyHeader title={`${userName || mockMyData.user.name}님`} email={email || undefined} />
      </motion.div>
      <motion.main
        className="space-y-3 pb-28"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
      >
        <motion.div variants={itemVariants} className="pt-1">
          <ModelStatusCard status={mockMyData.modelStatus} />
        </motion.div>
        <motion.div variants={itemVariants} className="pt-1">
          <MyMenuSection items={mockMyData.menuItems} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <LogoutButton />
        </motion.div>
      </motion.main>
    </div>
  );
}

export default MyPage;
