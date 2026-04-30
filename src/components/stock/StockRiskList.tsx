import type { StockRiskItem } from "../../types/stock";
import StockRiskListItem from "./StockRiskListItem";

type StockRiskListProps = {
  items: StockRiskItem[];
};

function StockRiskList({ items }: StockRiskListProps) {
  return (
    <ul className="overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      {items.map((item, index) => {
        return (
          <StockRiskListItem
            key={item.symbol}
            symbol={item.symbol}
            name={item.name}
            riskPercent={item.riskPercent}
            period={item.periodLabel}
            isLast={index === items.length - 1}
          />
        );
      })}
    </ul>
  );
}

export default StockRiskList;
