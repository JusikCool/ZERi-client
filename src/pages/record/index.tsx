import { motion } from "framer-motion";
import RecordItemCard from "../../components/stock/RecordItemCard";
import { mockRecordData } from "../../data/mockRecordData";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function RecordPage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pt-6 text-slate-900">
      <motion.header
        className="px-1 pb-4 pt-1"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <h1 className="text-[1.375rem] font-bold tracking-[-0.04em] text-slate-900">기록</h1>
      </motion.header>
      <motion.main
        className="space-y-3 pb-28"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
      >
        {mockRecordData.map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <RecordItemCard item={item} />
          </motion.div>
        ))}
        <motion.p
          variants={itemVariants}
          className="px-1 pt-2 text-center text-[11px] leading-5 text-slate-400"
        >
          투자 판단과 손실은 투자자 본인에게 귀속됩니다.
        </motion.p>
      </motion.main>
    </div>
  );
}

export default RecordPage;
