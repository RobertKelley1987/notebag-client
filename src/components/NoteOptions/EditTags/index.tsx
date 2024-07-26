import type { ReactNode } from "react";
import EditTagsBackButton from "./EditTagsBackButton";
import SearchIcon from "../../icons/SearchIcon";

type EditTagsProps = {
  input: ReactNode;
  children: ReactNode;
};
function EditTags({ input, children }: EditTagsProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="font-ibm w-full sm:w-auto h-full sm:h-auto min-w-[200px] bg-white flex flex-col gap-4 sm:gap-2 p-3 sm:p-0"
    >
      <h2 className="hidden sm:block font-semibold">Note Tags</h2>
      <div className="flex gap-2 sm:gap-1 w-full">
        <EditTagsBackButton />
        {input}
        <SearchIcon className="basis-[24px] shrink-0 hidden sm:block" />
      </div>
      {children}
    </div>
  );
}

export default EditTags;
