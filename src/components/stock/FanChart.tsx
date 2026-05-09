import {
  AreaSeries,
  BaselineSeries,
  ColorType,
  CrosshairMode,
  LineSeries,
  createChart,
  LineStyle,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import type { FanChartData, FanChartPeriod } from "../../types/stock";
import Card from "../ui/Card";

type FanChartProps = {
  data: FanChartData;
};

const PERIODS: { key: FanChartPeriod; label: string }[] = [
  { key: "D", label: "1M" },
  { key: "W", label: "3M" },
  { key: "M", label: "1Y" },
];

const PERIOD_SLICE: Record<FanChartPeriod, number> = {
  D: 25,
  W: 65,
  M: 252,
};

function toTime(ts: number) {
  return ts as UTCTimestamp;
}

function FanChart({ data }: FanChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const histSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const histQ05SeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const fanSeriesRef = useRef<ISeriesApi<"Baseline"> | null>(null);
  const [period, setPeriod] = useState<FanChartPeriod>("D");
  const [showHistQ05, setShowHistQ05] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#94a3b8",
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#f1f5f9", style: LineStyle.Dotted },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: {
          color: "#94a3b8",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#475569",
        },
        horzLine: {
          color: "#94a3b8",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#475569",
        },
      },
      localization: {
        dateFormat: "yy.MM.dd",
      },
      rightPriceScale: {
        borderVisible: false,
        autoScale: true,
        scaleMargins: { top: 0.1, bottom: 0.15 },
      },
      leftPriceScale: { visible: false },
      timeScale: {
        borderVisible: false,
        tickMarkFormatter: (time: unknown) => {
          const d = new Date((time as number) * 1000);
          const yy = String(d.getUTCFullYear()).slice(2);
          const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
          const dd = String(d.getUTCDate()).padStart(2, "0");
          return `${yy}.${mm}.${dd}`;
        },
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      width: containerRef.current.clientWidth,
      height: 192,
    });

    chartRef.current = chart;

    const histSeries = chart.addSeries(AreaSeries, {
      lineColor: "#ef4444",
      topColor: "rgba(239,68,68,0.18)",
      bottomColor: "rgba(239,68,68,0.01)",
      lineWidth: 2,
      lastValueVisible: false,
      priceLineVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: "#ef4444",
      crosshairMarkerBackgroundColor: "#ffffff",
    });
    histSeriesRef.current = histSeries;

    const histQ05Series = chart.addSeries(LineSeries, {
      color: "#818cf8",
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      visible: false,
      lastValueVisible: false,
      priceLineVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 3,
      crosshairMarkerBorderColor: "#818cf8",
      crosshairMarkerBackgroundColor: "#818cf8",
    });
    histQ05SeriesRef.current = histQ05Series;

    const baselinePrice = data.allHistory[data.allHistory.length - 1].value;
    const fanSeries = chart.addSeries(BaselineSeries, {
      baseValue: { type: "price", price: baselinePrice },
      topLineColor: "transparent",
      topFillColor1: "transparent",
      topFillColor2: "transparent",
      bottomLineColor: "rgb(156,163,175)",
      bottomFillColor1: "rgba(209,213,219,0.45)",
      bottomFillColor2: "rgba(209,213,219,0.05)",
      lineWidth: 1,
      lineStyle: LineStyle.Dashed,
      lastValueVisible: false,
      priceLineVisible: false,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 3,
      crosshairMarkerBorderColor: "rgb(156,163,175)",
      crosshairMarkerBackgroundColor: "rgb(156,163,175)",
    });
    fanSeries.setData(
      data.q05Prices.map((p) => ({ time: toTime(p.time), value: p.value })),
    );
    fanSeriesRef.current = fanSeries;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
      histSeriesRef.current = null;
      histQ05SeriesRef.current = null;
      fanSeriesRef.current = null;
    };
  }, [data]);

  useEffect(() => {
    const series = histSeriesRef.current;
    const q05Series = histQ05SeriesRef.current;
    const chart = chartRef.current;
    if (!series || !q05Series || !chart) return;

    const count = PERIOD_SLICE[period];
    series.setData(
      data.allHistory
        .slice(-count)
        .map((p) => ({ time: toTime(p.time), value: p.value })),
    );
    const histSlice = data.historicalQ05
      .slice(-count)
      .map((p) => ({ time: toTime(p.time), value: p.value }));
    const futureSlice = data.q05Prices.slice(1).map((p) => ({
      time: toTime(p.time),
      value: p.value,
    }));
    q05Series.setData([...histSlice, ...futureSlice]);
    chart.timeScale().fitContent();
  }, [period, data]);

  useEffect(() => {
    histQ05SeriesRef.current?.applyOptions({ visible: showHistQ05 });
    fanSeriesRef.current?.applyOptions({
      bottomLineColor: showHistQ05 ? "transparent" : "rgb(156,163,175)",
    });
  }, [showHistQ05]);

  return (
    <Card className="rounded-[20px] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-slate-100 p-0.5">
            {PERIODS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setPeriod(key)}
                className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold transition-all ${
                  period === key
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-0.5 w-3 rounded-full bg-red-500" />
              <span className="text-[10px] text-slate-400">종가</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-0.5 w-3 border-t-2 border-dashed border-slate-400" />
              <span className="text-[10px] text-slate-400">Q0.05</span>
            </div>
            <button
              type="button"
              onClick={() => setShowHistQ05((v) => !v)}
              className={`flex items-center gap-1 transition-opacity ${showHistQ05 ? "opacity-100" : "opacity-40"}`}
            >
              <div className="h-0.5 w-3 border-t-2 border-dashed border-indigo-400" />
              <span className="text-[10px] font-medium text-indigo-400">
                과거 예측
              </span>
            </button>
          </div>
        </div>
      </div>
      <div ref={containerRef} />
    </Card>
  );
}

export default FanChart;
