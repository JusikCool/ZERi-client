import Card from "../ui/Card";

type UserSummaryCardProps = {
  label: string;
  subtitle: string;
  highlightedValue: string;
  description: string;
};

function UserSummaryCard({
  label,
  subtitle,
  highlightedValue,
  description,
}: UserSummaryCardProps) {
  return (
    <Card className="overflow-hidden rounded-[22px] border-transparent bg-linear-to-br from-blue-500 to-blue-600 px-5 py-4.5 text-white shadow-[0_10px_24px_rgba(37,99,235,0.16)]">
      <div className="space-y-2.5">
        <p className="text-[11px] font-semibold tracking-[-0.01em] text-blue-100/95">
          {label}
        </p>
        <div className="space-y-1.5">
          <p className="text-[13px] font-medium leading-none text-blue-50/90">
            {subtitle}
          </p>
          <p className="text-[3rem] font-bold leading-none tracking-normal [font-variant-numeric:tabular-nums]">
            {highlightedValue}
          </p>
        </div>
        <p className="max-w-[16rem] text-[12px] leading-[1.45] text-blue-50/88">
          {description}
        </p>
      </div>
    </Card>
  );
}

export default UserSummaryCard;
