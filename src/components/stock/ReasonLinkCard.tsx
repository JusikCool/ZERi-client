import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";

type ReasonLinkCardProps = {
  href?: string;
};

function ReasonLinkCard({ href }: ReasonLinkCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        if (href) navigate(href);
      }}
      className="block w-full cursor-pointer text-left transition-transform active:scale-[0.995] focus-visible:outline-none"
    >
      <Card className="rounded-[18px] p-4 transition-colors hover:bg-slate-50/80 focus-within:ring-2 focus-within:ring-blue-500/20">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">
              왜 위험한지 알려드릴게요
            </p>
            <p className="text-xs text-slate-400">핵심 변수 5개</p>
          </div>
          <span aria-hidden="true" className="text-lg font-semibold leading-none text-blue-500">
            →
          </span>
        </div>
      </Card>
    </button>
  );
}

export default ReasonLinkCard;
