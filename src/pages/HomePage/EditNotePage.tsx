import {
  ActionFunction,
  Await,
  LoaderFunction,
  defer,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import notes from "../../services/notes";
import Modal from "../../components/Modal";
import { Note } from "../../types";
import { Suspense } from "react";

function EditNotePage() {
  const { notePromise } = useLoaderData() as { notePromise: Promise<Note> };
  const navigate = useNavigate();

  const handleDismiss = () => {
    console.log("dismiss");
    navigate("/");
  };

  return (
    <Modal handleDismiss={handleDismiss}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-3">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={notePromise}
            errorElement={<p>Failed to load note :(</p>}
          >
            {(note) => <p>Edit note {note.id}</p>}
          </Await>
        </Suspense>
      </div>
    </Modal>
  );
}

const loader: LoaderFunction = async ({ params }) => {
  const { noteId } = params;
  if (!noteId) {
    throw new Error("Note id required as parameter.");
  }

  const getNote = async () => {
    const { note } = await notes.findOne(noteId);
    return note;
  };

  return defer({ notePromise: getNote() });
};

const action: ActionFunction = async ({ request, params }) => {
  return null;
};

export const editNoteRoute = { element: <EditNotePage />, loader, action };
