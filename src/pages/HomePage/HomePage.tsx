import { defer, Outlet, redirect } from "react-router-dom";
import users from "../../services/users";
import notes from "../../services/notes";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Notes from "./Notes";
import type { ActionFunction, LoaderFunction } from "react-router-dom";

function HomePage() {
  return (
    <PageContainer>
      <Header />
      <main className="text-black items-center flex flex-col">
        <Outlet />
        <Notes />
      </main>
    </PageContainer>
  );
}

const loader: LoaderFunction = async () => {
  const { userId } = await users.getSession();
  if (!userId) {
    throw redirect("/register");
  }

  async function getNotes() {
    return await notes.findAll();
  }

  return defer({ notesPromise: getNotes() });
};

const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (request.method === "POST") {
    await notes.create(title, content);
  } else if (request.method === "PUT") {
    const noteId = formData.get("id") as string;
    await notes.update(noteId, title, content);
  }

  return null;
};

export const homeRoute = { element: <HomePage />, loader, action };
