import Modal from "../../components/Modal";
import EditNoteForm from "./EditNoteForm";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

function EditNotePage() {
  const { setModal } = useContext(ModalContext);

  return (
    <Modal rootId="modal" handleDismiss={() => setModal("")}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[250px] p-3 border border-black"
      >
        <EditNoteForm />
      </div>
    </Modal>
  );
}

export default EditNotePage;
