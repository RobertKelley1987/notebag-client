import { useUserTags } from "../../hooks/useUserTags";
import Tag from "./Tag";

function TagList() {
  const { userTags } = useUserTags();

  return (
    <ul className="flex flex-col gap-3">
      {userTags.map((tag) => {
        return <Tag key={tag.id} tag={tag} />;
      })}{" "}
    </ul>
  );
}

export default TagList;
