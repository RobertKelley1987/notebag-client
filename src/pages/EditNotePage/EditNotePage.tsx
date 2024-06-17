import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import EditNoteForm from "./EditNoteForm";

function EditNotePage() {
  const navigate = useNavigate();

  return (
    <Modal rootId="modal" handleDismiss={() => navigate("/")}>
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
