import type { MyMenuItemData } from "../../types/my";
import SectionHeader from "../ui/SectionHeader";
import MyMenuList from "./MyMenuList";

type MyMenuSectionProps = {
  title?: string;
  items: MyMenuItemData[];
};

function MyMenuSection({
  title = "\uAD00\uB9AC",
  items,
}: MyMenuSectionProps) {
  return (
    <section className="space-y-2.5">
      <SectionHeader
        title={title}
        className="px-0.5 pt-1"
        titleClassName="text-[13px] font-semibold text-slate-600"
      />
      <MyMenuList items={items} />
    </section>
  );
}

export default MyMenuSection;
