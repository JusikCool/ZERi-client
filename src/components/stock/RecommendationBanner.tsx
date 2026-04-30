import Card from "../ui/Card";

type RecommendationTone = "default" | "danger";

type RecommendationBannerProps = {
  label: string;
  title: string;
  tone?: RecommendationTone;
};

function RecommendationBanner({
  label,
  title,
  tone = "default",
}: RecommendationBannerProps) {
  const toneClassName =
    tone === "danger"
      ? "bg-slate-900 text-white"
      : "bg-slate-800 text-white";

  return (
    <Card
      className={`rounded-[18px] !border-0 px-4 py-3.5 !shadow-none ${toneClassName === "bg-slate-900 text-white" ? "!bg-slate-900 text-white" : "!bg-slate-800 text-white"}`}
    >
      <div className="flex min-h-[56px] items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white">
          !
        </div>
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium text-slate-300">{label}</p>
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-white">
            {title}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default RecommendationBanner;
