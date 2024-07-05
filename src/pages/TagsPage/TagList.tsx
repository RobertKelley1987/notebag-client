import { useContext } from "react";
import { UserTagsContext } from "../../context/UserTagsContext";
import Tag from "./Tag";

function TagList() {
  const { userTags } = useContext(UserTagsContext);

  return (
    <ul className="flex flex-col gap-3">
      {userTags.map((tag) => {
        return <Tag key={tag.id} tag={tag} />;
      })}{" "}
    </ul>
  );
}

export default TagList;
