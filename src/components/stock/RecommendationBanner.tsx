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
    tone === "danger" ? "bg-slate-900 text-white" : "bg-slate-900 text-white";

  return (
    <Card className={`border-0 px-4 py-3 ${toneClassName}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500 text-sm font-semibold text-white">
          !
        </div>
        <div className="space-y-0.5">
          <p className="text-xs text-slate-300">{label}</p>
          <p className="text-sm font-semibold">{title}</p>
        </div>
      </div>
    </Card>
  );
}

export default RecommendationBanner;
