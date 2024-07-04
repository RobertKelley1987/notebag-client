import { useContext } from "react";
import { NoteContext } from "../../context/NoteContext";
import { IsSavingContext } from "../../context/IsSavingContext";
import type { Tag } from "../../types";

type TagCheckboxProps = {
  handleChange: () => Promise<void>;
  tag: Tag;
  isChecked: boolean;
};

function TagCheckbox({ handleChange, tag, isChecked }: TagCheckboxProps) {
  const { isSaving } = useContext(IsSavingContext);

  return (
    <li>
      <label
        htmlFor={tag.name}
        className="flex gap-2 hover:cursor-pointer items-center text-black hover:text-aqua"
      >
        <input
          onChange={handleChange}
          type="checkbox"
          id={tag.name}
          value={tag.name}
          checked={isChecked}
          disabled={isSaving}
          className="grid shrink-0 place-content-center w-5 h-5 appearance-none border border-current hover:cursor-pointer checked:before:content-[''] checked:before:w-3 checked:before:h-3 checked:before:bg-aqua"
        />
        <span>{tag.name}</span>
      </label>
    </li>
  );
}

export default TagCheckbox;
