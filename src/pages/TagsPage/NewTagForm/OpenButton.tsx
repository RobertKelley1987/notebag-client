import PlusIcon from "../../../components/icons/PlusIcon";
import type { Dispatch, SetStateAction } from "react";

type OpenButtonProps = {
  setFormActive: Dispatch<SetStateAction<boolean>>;
};

function OpenButton({ setFormActive }: OpenButtonProps) {
  return (
    <button onClick={() => setFormActive(true)} className="hover:text-aqua">
      <PlusIcon />
    </button>
  );
}

export default OpenButton;
