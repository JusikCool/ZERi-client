import { useMotionValue, useTransform, animate, motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { TodayRisk } from "../../types/stock";
import StockIdentity from "./StockIdentity";
import Button from "../ui/Button";
import Card from "../ui/Card";

type TodayRiskCardProps = {
  risk: TodayRisk;
};

function TodayRiskCard({ risk }: TodayRiskCardProps) {
  const navigate = useNavigate();
  const subtitle =
    risk.stock.price !== undefined && risk.stock.changeRate !== undefined
      ? `$${risk.stock.price.toFixed(2)} · 어제 대비 +${risk.stock.changeRate}%`
      : undefined;

  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const controls = animate(count, risk.downsidePercent, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.3,
    });
    return controls.stop;
  }, [count, risk.downsidePercent]);

  return (
    <Card className="space-y-4 p-4">
      <StockIdentity symbol={risk.stock.symbol} name={risk.stock.name} subtitle={subtitle} />
      <div className="rounded-[18px] bg-rose-50 px-4 py-3.5">
        <p className="mt-1 text-sm font-medium text-slate-500">미래 30일 최악의 경우 예측 수익률</p>
        <div className="mt-1 flex items-end gap-2">
          <motion.p className="text-[3.25rem] font-bold leading-none tracking-[-0.06em] text-rose-500 [font-variant-numeric:tabular-nums]">
            {rounded}
          </motion.p>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          투자 판단과 손실은 투자자 본인에게 귀속됩니다.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="secondary" onClick={() => navigate(`/stocks/${risk.stock.symbol}/why`)}>
          왜 위험한가요?
        </Button>
        <Button onClick={() => navigate(`/stocks/${risk.stock.symbol}`)}>자세히 보기</Button>
      </div>
    </Card>
  );
}

export default TodayRiskCard;
