import type { StockRiskItem } from "../../types/stock";
import StockRiskList from "../stock/StockRiskList";
import SectionHeader from "../ui/SectionHeader";

type WatchlistSectionProps = {
  items: StockRiskItem[];
};

function WatchlistSection({ items }: WatchlistSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title="관심 종목" />
      <StockRiskList items={items} />
    </section>
  );
}

export default WatchlistSection;
