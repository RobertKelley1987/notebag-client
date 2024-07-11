import { useIsSaving } from "../../../hooks/useIsSaving";
import CheckmarkIcon from "../../../components/icons/CheckmarkIcon";
import type { MouseEventHandler } from "react";

type NewTagButtonProps = {
  submit: () => Promise<void>;
};

function NewTagButton({ submit }: NewTagButtonProps) {
  const { isSaving } = useIsSaving();

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
