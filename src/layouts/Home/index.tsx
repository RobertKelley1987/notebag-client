import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserNotesContextProvider from "../../context/UserNotesContextProvider";
import UserTagsContextProvider from "../../context/UserTagsContextProvider";
import IsSavingContextProvider from "../../context/IsSavingContextProvider";
import { useAuth } from "../../hooks/useAuth";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import NewNoteForm from "./NewNoteForm";
import Notes from "./Notes";
import TagsPage from "../../pages/TagsPage";
import { useRefreshToken } from "../../hooks/useRefreshToken";

function Home() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [editingTags, setEditingTags] = useState(false);

  console.log("home page");

  function renderHome() {
    return (
      <UserNotesContextProvider>
        <UserTagsContextProvider>
          <IsSavingContextProvider>
            <PageContainer>
              {editingTags && <TagsPage setEditingTags={setEditingTags} />}
              <Header setMenuOpen={setMenuOpen} />
              <div className="font-ibm flex basis-full grow">
                {menuOpen && <Menu setEditingTags={setEditingTags} />}
                <main className="text-black items-center flex flex-col flex flex-col basis-full grow px-6">
                  <NewNoteForm />
                  <Notes />
                </main>
              </div>
              <Outlet />
            </PageContainer>
          </IsSavingContextProvider>
        </UserTagsContextProvider>
      </UserNotesContextProvider>
    );
  }

  return renderHome();
}

export default Home;
