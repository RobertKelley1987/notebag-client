import DeleteButton from "../../../components/note/DeleteButton";

type NewNoteDeleteButtonProps = {
  resetForm: () => void;
};

function NewNoteDeleteButton({ resetForm }: NewNoteDeleteButtonProps) {
  return <DeleteButton onClick={resetForm} />;
}

export default NewNoteDeleteButton;
