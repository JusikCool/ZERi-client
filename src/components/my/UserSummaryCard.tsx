import Card from "../ui/Card";

type UserSummaryCardProps = {
  userName: string;
  title: string;
  highlightedValue: string;
  description: string;
};

function UserSummaryCard({
  userName,
  title,
  highlightedValue,
  description,
}: UserSummaryCardProps) {
  return (
    <Card className="overflow-hidden rounded-[24px] bg-blue-500 p-5 text-white">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-blue-100">{userName}님의 BEFORE 효과</p>
        <div className="space-y-1.5">
          <p className="max-w-[18rem] text-base font-semibold leading-6 tracking-[-0.02em] text-white">
            {title}
          </p>
          <p className="text-[3rem] font-bold leading-none tracking-[-0.05em] [font-variant-numeric:tabular-nums]">
            {highlightedValue}
          </p>
        </div>
        <p className="text-sm leading-5 text-blue-50/90">{description}</p>
      </div>
    </Card>
  );
}

export default UserSummaryCard;
