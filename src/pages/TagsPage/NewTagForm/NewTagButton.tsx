import { useContext } from "react";
import { IsSavingContext } from "../../../context/IsSavingContext";
import CheckmarkIcon from "../../../components/icons/CheckmarkIcon";
import type { MouseEventHandler } from "react";

type NewTagButtonProps = {
  submit: () => Promise<void>;
};

function NewTagButton({ submit }: NewTagButtonProps) {
  const { isSaving } = useContext(IsSavingContext);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    await submit();
  };

  return (
    <button
      id="submit"
      onClick={handleClick}
      disabled={isSaving}
      type="submit"
      className="hover:text-aqua"
    >
      <CheckmarkIcon />
    </button>
  );
}

export default NewTagButton;
