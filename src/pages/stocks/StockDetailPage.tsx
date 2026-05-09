import { useNavigate, useParams } from "react-router-dom";
import FanChart from "../../components/stock/FanChart";
import ReasonLinkCard from "../../components/stock/ReasonLinkCard";
import RecommendationBanner from "../../components/stock/RecommendationBanner";
import RiskMetricGrid from "../../components/stock/RiskMetricGrid";
import RiskSummaryCard from "../../components/stock/RiskSummaryCard";
import StockDetailHeader from "../../components/stock/StockDetailHeader";
import { mockStockDetailData } from "../../data/mockStockDetailData";

function StockDetailPage() {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();

  const normalizedSymbol = symbol?.toUpperCase() ?? "PLTR";
  const detailData =
    mockStockDetailData[normalizedSymbol] ?? mockStockDetailData.PLTR;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pb-28 pt-5 text-slate-900">
      <StockDetailHeader
        title={detailData.stock.displayTitle}
        onBack={() => {
          if (window.history.length > 1) {
            navigate(-1);
            return;
          }

          navigate("/");
        }}
      />
      <main className="space-y-3 px-0.5 pb-6 pt-5">
        <RiskSummaryCard summary={detailData.riskSummary} />
        <FanChart data={detailData.fanChart} />
        <ReasonLinkCard href={detailData.reasonLink.href} />
      </main>
    </div>
  );
}

export default StockDetailPage;
