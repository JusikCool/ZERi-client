import type { SimilarCase } from "../../types/risk";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import SimilarCaseItem from "./SimilarCaseItem";

type SimilarCasesSectionProps = {
  title: string;
  items: SimilarCase[];
};

function SimilarCasesSection({ title, items }: SimilarCasesSectionProps) {
  return (
    <section className="space-y-2.5 pt-2">
      <SectionHeader
        title={title}
        titleClassName="text-[14px] font-semibold text-slate-600"
      />
      <Card className="overflow-hidden rounded-[20px] border border-slate-100/90 p-0 shadow-[0_8px_20px_rgba(15,23,42,0.035)]">
        <ul>
          {items.map((item, index) => (
            <SimilarCaseItem
              key={item.id}
              item={item}
              isLast={index === items.length - 1}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default SimilarCasesSection;
