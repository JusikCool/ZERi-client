import { useNavigate, useParams } from "react-router-dom";
import { useStockWhy } from "../../hooks/stock/useStockWhy";
import RiskReasonList from "../../components/stock/RiskReasonList";
import RiskReasonSummary from "../../components/stock/RiskReasonSummary";
import StockDetailHeader from "../../components/stock/StockDetailHeader";

function StockWhyPage() {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const ticker = symbol?.toUpperCase() ?? "";
  const { data, loading, error } = useStockWhy(ticker);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pb-28 pt-5 text-slate-900">
      <StockDetailHeader
        title={data?.title ?? ticker}
        backAriaLabel={`${ticker} 상세로 돌아가기`}
        onBack={() => navigate(-1)}
      />

      {loading ? (
        <div className="space-y-3 pt-4">
          <div className="h-28 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-24 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-24 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      ) : error ? (
        <div className="pt-4">
          <div className="rounded-2xl bg-rose-50 px-4 py-3">
            <p className="text-sm text-rose-500">{error}</p>
          </div>
        </div>
      ) : data ? (
        <main className="space-y-4 px-0.5 pb-7 pt-4">
          <RiskReasonSummary segments={data.summary} />
          <RiskReasonList reasons={data.reasons} />
        </main>
      ) : null}
    </div>
  );
}

export default StockWhyPage;
