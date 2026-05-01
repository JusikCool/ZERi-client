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
  const pageData =
    mockRiskReasonData[normalizedSymbol] ?? mockRiskReasonData.PLTR;

  const viewModel = {
    title: pageData.pageTitle,
    summary: pageData.summary,
    reasons: pageData.reasons,
    similarCasesTitle: `비슷했던 과거 ${pageData.similarCases.length}건`,
    similarCases: pageData.similarCases,
    fallbackDetailPath: `/stocks/${pageData.stock.symbol}`,
  };

  return (
    <div className="min-h-dvh bg-[#f2f4f6] px-4 pb-8 pt-5 text-slate-900 sm:py-8">
      <div className="mx-auto flex min-h-[calc(100dvh-2.5rem)] w-full max-w-[430px] flex-col bg-[#f2f4f6]">
        <StockDetailHeader
          title={viewModel.title}
          onBack={() => {
            if (window.history.length > 1) {
              navigate(-1);
              return;
            }

            navigate(viewModel.fallbackDetailPath);
          }}
        />
        <main className="space-y-6 px-0.5 pb-6 pt-5">
          <RiskReasonSummary
            prefix={viewModel.summary.prefix}
            highlight={viewModel.summary.highlight}
            suffix={viewModel.summary.suffix}
          />
          <RiskReasonList reasons={viewModel.reasons} />
          <SimilarCasesSection
            title={viewModel.similarCasesTitle}
            items={viewModel.similarCases}
          />
        </main>
      </div>
    </div>
  );
}

export default StockWhyPage;
