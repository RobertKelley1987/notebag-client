import CloseIcon from "../../../components/icons/CloseIcon";
import type { Dispatch, SetStateAction } from "react";

type CloseButtonProps = {
  setFormActive: Dispatch<SetStateAction<boolean>>;
};

function CloseButton({ setFormActive }: CloseButtonProps) {
  return (
    <button onClick={() => setFormActive(false)} className="hover:text-aqua">
      <CloseIcon />
    </button>
  );
}

export default CloseButton;
