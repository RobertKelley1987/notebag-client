import { useState } from "react";
import { Outlet, redirect } from "react-router-dom";
import users from "../../services/users";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import NewNoteForm from "../../pages/HomePage/NewNoteForm";
import Notes from "../../pages/HomePage/Notes";
import type { LoaderFunction } from "react-router-dom";
import UserNotesContextProvider from "../../context/UserNotesContextProvider";
import UserTagsContextProvider from "../../context/UserTagsContextProvider";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <UserNotesContextProvider>
      <UserTagsContextProvider>
        <Outlet />
        <PageContainer>
          <Header setMenuOpen={setMenuOpen} />
          <div className="flex basis-full grow">
            {menuOpen && <Menu />}
            <main className="text-black items-center flex flex-col flex flex-col basis-full grow px-6">
              <NewNoteForm />
              <Notes />
            </main>
          </div>
        </PageContainer>
      </UserTagsContextProvider>
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
