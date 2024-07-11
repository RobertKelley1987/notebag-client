import { useSearchParams } from "react-router-dom";
import { useUserTags } from "./useUserTags";

export function useFoundTag() {
  const { userTags } = useUserTags();
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const foundTag = userTags.find((tag) => tag.name === tagFilter);

  return { foundTag };
}
