import { Outlet, redirect } from "react-router-dom";
import users from "../../services/users";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import NewNoteForm from "../../pages/HomePage/NewNoteForm";
import Notes from "../../pages/HomePage/Notes";
import type { LoaderFunction } from "react-router-dom";
import UserNotesContextProvider from "../../context/UserNotesContextProvider";

function Home() {
  return (
    <UserNotesContextProvider>
      <Outlet />
      <PageContainer>
        <Header />
        <main className="text-black items-center flex flex-col flex flex-col basis-full grow">
          <NewNoteForm />
          <Notes />
        </main>
      </PageContainer>
    </UserNotesContextProvider>
  );
}

const loader: LoaderFunction = async () => {
  const { userId } = await users.getSession();
  if (!userId) {
    throw redirect("/login");
  }

  return null;
};

export const homeRoute = { element: <Home />, loader };
