import { useTagSearch } from "../../../hooks/useTagSearch";
import { useUserTags } from "../../../hooks/useUserTags";
import type { Tag } from "../../../types";
import type { ReactNode } from "react";

type TagResultsProps = {
  renderCheckbox: (tag: Tag) => ReactNode;
};

function TagResults({ renderCheckbox }: TagResultsProps) {
  const { userTags } = useUserTags();
  const { tagSearch } = useTagSearch();
  const results = userTags.filter((tag) => tag.name.includes(tagSearch));

  function renderList() {
    return (
      <ul className="flex flex-col gap-6 sm:gap-4 sm:gap-1">
        {results.map((tag) => renderCheckbox(tag))}
      </ul>
    );
  }

  return results.length ? renderList() : null;
}

export default TagResults;
