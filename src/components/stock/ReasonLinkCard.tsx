import { Link } from "react-router-dom";
import Card from "../ui/Card";

type ReasonLinkCardProps = {
  title: string;
  description: string;
  href: string;
};

function ReasonLinkCard({ title, description, href }: ReasonLinkCardProps) {
  return (
    <Link to={href} className="block">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="text-xs text-slate-400">{description}</p>
          </div>
          <span aria-hidden="true" className="text-blue-500">
            →
          </span>
        </div>
      </Card>
    </Link>
  );
}

export default ReasonLinkCard;
