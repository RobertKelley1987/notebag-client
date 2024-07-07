import CloseIcon from "../../../components/icons/CloseIcon";

type CloseButtonProps = {
  resetForm: () => void;
};

function CloseButton({ resetForm }: CloseButtonProps) {
  return (
    <button id="close" onClick={resetForm} className="hover:text-aqua">
      <CloseIcon />
    </button>
  );
}

export default CloseButton;
