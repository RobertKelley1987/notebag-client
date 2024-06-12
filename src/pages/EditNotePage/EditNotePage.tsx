import { Suspense } from "react";
import {
  ActionFunction,
  Await,
  LoaderFunction,
  defer,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import notes from "../../services/notes";
import Modal from "../../components/Modal";
import EditNoteForm from "./EditNoteForm";
import { Note } from "../../types";

function EditNotePage() {
  const { notePromise } = useLoaderData() as { notePromise: Promise<Note> };
  const navigate = useNavigate();

  return (
    <Modal handleDismiss={() => navigate("/")}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-[250px] p-3 border border-black"
      >
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={notePromise}
            errorElement={<p>Something went wrong.</p>}
          >
            <EditNoteForm />
          </Await>
        </Suspense>
      </div>
    </Modal>
  );
}

const loader: LoaderFunction = async ({ params }) => {
  const { noteId } = params;

  async function getNote() {
    if (!noteId) {
      throw new Error("Note id required as parameter.");
    }

    const { note } = await notes.findOne(noteId);
    return note;
  }

  return defer({ notePromise: getNote() });
};

const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const noteId = formData.get("noteId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  console.log("edit form action");

  if (request.method === "PUT") {
    await notes.update(noteId, title, content);
    return redirect("/");
  }
  return null;
};

export const editNoteRoute = { element: <EditNotePage />, loader, action };
