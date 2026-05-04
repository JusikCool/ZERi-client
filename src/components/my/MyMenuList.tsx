import type { MyMenuItemData } from "../../types/my";
import Card from "../ui/Card";
import MyMenuItem from "./MyMenuItem";

type MyMenuListProps = {
  items: MyMenuItemData[];
};

function MyMenuList({ items }: MyMenuListProps) {
  return (
    <Card className="overflow-hidden rounded-[22px]">
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
