import { useNavigate, useParams } from "react-router-dom";
import RiskReasonList from "../../components/stock/RiskReasonList";
import RiskReasonSummary from "../../components/stock/RiskReasonSummary";
import SimilarCasesSection from "../../components/stock/SimilarCasesSection";
import StockDetailHeader from "../../components/stock/StockDetailHeader";
import { mockRiskReasonData } from "../../data/mockRiskReasonData";

function StockWhyPage() {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();

  const normalizedSymbol = symbol?.toUpperCase() ?? "PLTR";
  const pageData = mockRiskReasonData[normalizedSymbol] ?? mockRiskReasonData.PLTR;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pb-28 pt-5 text-slate-900">
      <StockDetailHeader
        title={pageData.pageTitle}
        backAriaLabel={`${pageData.stock.symbol} 상세로 돌아가기`}
        onBack={() => navigate(-1)}
      />
      <main className="space-y-4 px-0.5 pb-7 pt-4">
        <RiskReasonSummary segments={pageData.summary} />
        <RiskReasonList reasons={pageData.reasons} />
        <SimilarCasesSection
          title={`비슷했던 과거 ${pageData.similarCases.length}건`}
          items={pageData.similarCases}
        />
      </main>
    </div>
  );
}

export default StockWhyPage;
