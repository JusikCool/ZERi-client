import Card from "../ui/Card";

type ReasonLinkCardProps = {
  title: string;
  description: string;
  href?: string;
};

function ReasonLinkCard({ title, description }: ReasonLinkCardProps) {
  return (
    <button
      type="button"
      aria-label={title}
      className="block w-full cursor-pointer text-left transition-transform active:scale-[0.995] focus-visible:outline-none"
    >
      <Card className="rounded-[18px] p-4 transition-colors hover:bg-slate-50/80 focus-within:ring-2 focus-within:ring-blue-500/20">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">
              {title}
            </p>
            <p className="text-xs text-slate-400">{description}</p>
          </div>
          <span
            aria-hidden="true"
            className="text-lg font-semibold text-blue-500"
          >
            →
          </span>
        </div>
      </Card>
    </button>
  );
}

export default ReasonLinkCard;
