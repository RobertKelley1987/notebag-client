import { Fragment } from "react";
import { useUserTags } from "../../../hooks/useUserTags";
import MenuTag from "./MenuTag";

function MenuTags() {
  const { userTags } = useUserTags();
  return (
    <Fragment>
      {userTags.map((tag) => (
        <MenuTag key={tag.id} tag={tag} />
      ))}
    </Fragment>
  );
}

export default MenuTags;
