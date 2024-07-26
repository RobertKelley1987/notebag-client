import Modal from "../../../components/Modal";
import NewNoteForm from "./NewNoteForm";

function NewNoteModal() {
  return (
    <Modal>
      <div className="w-full h-full grow basis-full p-3 bg-white font-ibm">
        <NewNoteForm />
      </div>
    </Modal>
  );
}

export default NewNoteModal;
