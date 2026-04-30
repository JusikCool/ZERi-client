import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DownsideRangeCard from "../../components/stock/DownsideRangeCard";
import ReasonLinkCard from "../../components/stock/ReasonLinkCard";
import RecommendationBanner from "../../components/stock/RecommendationBanner";
import RiskMetricGrid from "../../components/stock/RiskMetricGrid";
import RiskSummaryCard from "../../components/stock/RiskSummaryCard";
import StockDetailHeader from "../../components/stock/StockDetailHeader";
import { mockStockDetailData } from "../../data/mockStockDetailData";

function StockDetailPage() {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();

  const detailData = useMemo(() => {
    const normalizedSymbol = symbol?.toUpperCase() ?? "PLTR";
    return mockStockDetailData[normalizedSymbol] ?? mockStockDetailData.PLTR;
  }, [symbol]);

  return (
    <div className="min-h-dvh bg-[#f2f4f6] px-4 pb-6 pt-6 text-slate-900 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-[430px] flex-col bg-[#f2f4f6]">
        <StockDetailHeader
          title={detailData.stock.displayTitle}
          onBack={() => navigate(-1)}
        />
        <main className="space-y-3 pb-6 pt-5">
          <RiskSummaryCard summary={detailData.riskSummary} />
          <RecommendationBanner
            label={detailData.recommendation.label}
            title={detailData.recommendation.title}
            tone="danger"
          />
          <RiskMetricGrid metrics={detailData.metrics} />
          <DownsideRangeCard range={detailData.downsideRange} />
          <ReasonLinkCard
            title={detailData.reasonLink.title}
            description={detailData.reasonLink.description}
            href={detailData.reasonLink.href}
          />
        </main>
      </div>
    </div>
  );
}

export default StockDetailPage;
