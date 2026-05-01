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
    <section className="space-y-3">
      <SectionHeader title={title} />
      <Card className="overflow-hidden rounded-[22px] p-0">
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
