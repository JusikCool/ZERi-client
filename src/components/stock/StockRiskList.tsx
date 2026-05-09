import { motion } from "framer-motion";
import type { StockRiskItem } from "../../types/stock";
import StockRiskListItem from "./StockRiskListItem";

type StockRiskListProps = {
  items: StockRiskItem[];
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function StockRiskList({ items }: StockRiskListProps) {
  return (
    <motion.ul
      className="overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div key={item.symbol} variants={itemVariants}>
          <StockRiskListItem
            symbol={item.symbol}
            name={item.name}
            riskPercent={item.riskPercent}
            period={item.periodLabel}
            isLast={index === items.length - 1}
          />
        </motion.div>
      ))}
    </motion.ul>
  );
}

export default StockRiskList;
