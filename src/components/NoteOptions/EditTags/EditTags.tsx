import { useTagSearch } from "../../../hooks/useTagSearch";
import EditTagsBackButton from "./EditTagsBackButton";
import SearchIcon from "../../icons/SearchIcon";
import type { ReactNode } from "react";

type EditTagsProps = {
  children: ReactNode;
};

function EditTags({ children }: EditTagsProps) {
  const { tagSearch, setTagSearch } = useTagSearch();

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="font-ibm w-screen sm:w-auto h-screen sm:h-auto min-w-[200px] bg-white flex flex-col gap-4 sm:gap-2 p-3 sm:p-0"
    >
      <h2 className="hidden sm:block font-semibold">Note Tags</h2>
      <div className="flex gap-2 sm:gap-1 w-full">
        <EditTagsBackButton />
        <input
          type="text"
          value={tagSearch}
          onChange={(e) => setTagSearch(e.target.value)}
          placeholder="tag name"
          className="w-full focus:outline-none"
        />
        <SearchIcon className="basis-[24px] shrink-0 hidden sm:block" />
      </div>
      {children}
    </div>
  );
}

export default EditTags;
