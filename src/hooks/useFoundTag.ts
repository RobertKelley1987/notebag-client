import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserTagsContext } from "../context/UserTagsContext";

export function useFoundTag() {
  const { userTags } = useContext(UserTagsContext);
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const foundTag = userTags.find((tag) => tag.name === tagFilter);
  return { foundTag };
}
