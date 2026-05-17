import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useStockDetail } from "../../hooks/stock/useStockDetail";
import FanChart from "../../components/stock/FanChart";
import ReasonLinkCard from "../../components/stock/ReasonLinkCard";
import RiskSummaryCard from "../../components/stock/RiskSummaryCard";
import StockDetailHeader from "../../components/stock/StockDetailHeader";

function StockDetailPage() {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const ticker = symbol?.toUpperCase() ?? "";
  const { data, loading, error } = useStockDetail(ticker);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-107.5 bg-[#f2f4f6] px-4 pb-28 pt-5 text-slate-900">
      <StockDetailHeader
        title={data?.title ?? ticker}
        onBack={() => {
          if (window.history.length > 1) {
            navigate(-1);
            return;
          }
          navigate("/");
        }}
      />

      {loading ? (
        <div className="space-y-3 pt-5">
          <div className="h-48 animate-pulse rounded-3xl bg-slate-200" />
          <div className="h-52 animate-pulse rounded-[20px] bg-slate-200" />
          <div className="h-16 animate-pulse rounded-[20px] bg-slate-200" />
        </div>
      ) : error ? (
        <div className="pt-5">
          <div className="rounded-2xl bg-rose-50 px-4 py-3">
            <p className="text-sm text-rose-500">{error}</p>
          </div>
        </div>
      ) : data ? (
        <motion.main
          className="space-y-3 px-0.5 pb-6 pt-5"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {[
            <RiskSummaryCard
              key="risk"
              summary={{ label: "위험", grade: data.grade, downsidePercent: data.downsidePercent }}
            />,
            <FanChart key="chart" data={data.fanChart} />,
            <ReasonLinkCard key="reason" href={`/stocks/${ticker}/why`} />,
          ].map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  },
                },
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.main>
      ) : null}
    </div>
  );
}

export default StockDetailPage;
