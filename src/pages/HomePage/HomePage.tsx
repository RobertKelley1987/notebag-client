import { Fragment, useState } from "react";
import { Outlet, defer, redirect } from "react-router-dom";
import users from "../../services/users";
import notes from "../../services/notes";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import NewNoteForm from "./NewNoteForm";
import Notes from "./Notes";
import type { ActionFunction, LoaderFunction } from "react-router-dom";

function HomePage() {
  return (
    <Fragment>
      <Outlet />
      <PageContainer>
        <Header />
        <main className="text-black items-center flex flex-col">
          <NewNoteForm />
          <Notes />
        </main>
      </PageContainer>
    </Fragment>
  );
}

const loader: LoaderFunction = async () => {
  const { userId } = await users.getSession();
  if (!userId) {
    throw redirect("/login");
  }

  async function getNotes() {
    return await notes.findAll();
  }

  return defer({ notesPromise: getNotes() });
};

const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const noteId = formData.get("noteId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  console.log("home action");

  if (request.method === "POST") {
    await notes.create(noteId, title, content);
  } else if (request.method === "PUT") {
    await notes.update(noteId, title, content);
  }

  return null;
};

export const homeRoute = { element: <HomePage />, loader, action };
