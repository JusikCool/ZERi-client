import type { MyMenuItemData } from "../../types/my";
import SectionHeader from "../ui/SectionHeader";
import MyMenuList from "./MyMenuList";

type MyMenuSectionProps = {
  title?: string;
  items: MyMenuItemData[];
};

function MyMenuSection({
  title = "관리",
  items,
}: MyMenuSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title={title} />
      <MyMenuList items={items} />
    </section>
  );
}

export default MyMenuSection;
