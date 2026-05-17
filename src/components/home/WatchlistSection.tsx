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
      {items.length > 0 ? (
        <StockRiskList items={items} />
      ) : (
        <div className="rounded-[20px] bg-white px-5 py-6 text-center shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
          <p className="text-sm font-medium text-slate-500">아직 관심 종목이 없어요</p>
          <p className="mt-1 text-xs text-slate-400">종목을 검색해서 추가해보세요</p>
        </div>
      )}
    </section>
  );
}

export default WatchlistSection;
