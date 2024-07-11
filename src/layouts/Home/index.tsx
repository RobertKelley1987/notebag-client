import { Fragment, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NoteFormContextProvider from "../../context/NoteFormContext";
import { useInitAppData } from "../../hooks/useInitAppData";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useModal } from "../../hooks/useModal";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import Loading from "./Loading";
import SearchResults from "./SearchResults";
import FetchError from "./FetchError";
import MobileMenu from "./MobileMenu";
import NewNoteButton from "./NewNoteButton";

function Home() {
  const { isLoading, error, setError } = useInitAppData();
  const { isSmallScreen } = useScreenSize();
  const [menuOpen, setMenuOpen] = useState(true);
  const { modal } = useModal();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useLayoutEffect(() => {
    if (isSmallScreen) {
      setMenuOpen(false);
    }
  }, [isSmallScreen]);

  function renderMenu() {
    return isSmallScreen ? (
      <MobileMenu handleDismiss={() => setMenuOpen(false)} />
    ) : (
      <Menu />
    );
  }

  function renderApp() {
    return (
      <Fragment>
        {menuOpen && renderMenu()}
        <main className="relative text-black items-center flex flex-col flex flex-col basis-full grow px-3 sm:px-6">
          {search === null && (
            <NoteFormContextProvider>
              <NewNote isLoading={isLoading} />
            </NoteFormContextProvider>
          )}
          {renderNoteList()}
        </main>
        {search === null && <NewNoteButton />}
      </Fragment>
    );
  }

  function renderNoteList() {
    if (error) {
      return <FetchError setError={setError} />;
    }
    return search !== null ? <SearchResults /> : <NoteList />;
  }

  return (
    <PageContainer>
      <Header setMenuOpen={setMenuOpen} />
      <div className="font-ibm flex basis-full grow">
        {isLoading ? <Loading /> : renderApp()}
      </div>
      {modal}
    </PageContainer>
  );
}

export default Home;
