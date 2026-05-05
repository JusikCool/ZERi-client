import type { MyMenuItemData } from "../../types/my";
import Card from "../ui/Card";
import MyMenuItem from "./MyMenuItem";

type MyMenuListProps = {
  items: MyMenuItemData[];
};

function MyMenuList({ items }: MyMenuListProps) {
  return (
    <Card className="overflow-hidden rounded-[20px] shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
      <ul>
        {items.map((item, index) => (
          <MyMenuItem
            key={item.id}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </ul>
    </Card>
  );
}

export default MyMenuList;
