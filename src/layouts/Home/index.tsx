import { useContext, useEffect, useState } from "react";
import { UserNotesContext } from "../../context/UserNotesContext";
import { ModalContext } from "../../context/ModalContext";
import TagNameContextProvider from "../../context/TagNameContextProvider";
import EditedTagContextProvider from "../../context/EditedTagContextProvider";
import { useNoteService } from "../../hooks/useNoteService";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import Loading from "./Loading";
import { SearchContext } from "../../context/SearchContext";
import SearchResults from "./SearchResults";
import FetchError from "./FetchError";

function Home() {
  const { modal } = useContext(ModalContext);
  const { setUserNotes } = useContext(UserNotesContext);
  const { isSearching } = useContext(SearchContext);
  const [menuOpen, setMenuOpen] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const notes = useNoteService();

  useEffect(() => {
    let isMounted = true;

    const getNotes = async () => {
      try {
        const data = await notes.findAll();
        if (isMounted) {
          setUserNotes(data.notes);
          setIsLoading(false);
        }
      } catch (error) {
        setError(true);
      }
    };

    getNotes();

    return () => {
      isMounted = false;
      notes.abort();
    };
  }, [error]);

  function renderNoteList() {
    if (error) {
      return <FetchError setError={setError} />;
    }
    return isSearching ? <SearchResults /> : <NoteList />;
  }

  return (
    <PageContainer>
      <Header setMenuOpen={setMenuOpen} />
      <div className="font-ibm flex basis-full grow">
        {menuOpen && <Menu />}
        <main className="relative text-black items-center flex flex-col flex flex-col basis-full grow px-6">
          {!isSearching && <NewNote isLoading={isLoading} />}
          {isLoading ? <Loading /> : renderNoteList()}
        </main>
      </div>
      {modal}
    </PageContainer>
  );
}

export default Home;
