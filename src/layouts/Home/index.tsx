import { Fragment, useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInitAppData } from "../../hooks/useInitAppData";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import { useModal } from "../../hooks/useModal";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import Loading from "./Loading";
import MobileMenu from "./MobileMenu";
import NewNoteButton from "./NewNoteButton";
import Main from "./Main";
import FetchError from "./FetchError";

function Home() {
  const { isLoading, error, setError } = useInitAppData();
  const { isSmallScreen } = useIsSmallScreen();
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

  function renderMain() {
    if (error) {
      return <FetchError setError={setError} />;
    } else {
      return;
    }
  }

  function renderApp() {
    return (
      <Fragment>
        {menuOpen && renderMenu()}
        <Main menuOpen={menuOpen} />
        {search === null && <NewNoteButton />}
      </Fragment>
    );
  }

  function renderHome() {
    if (isLoading) {
      return <Loading />;
    } else if (error) {
      return <FetchError setError={setError} />;
    } else {
      return renderApp();
    }
  }

  return (
    <PageContainer>
      <Header setMenuOpen={setMenuOpen} />
      <div className="font-ibm flex basis-full grow sm:justify-end">
        {renderHome()}
      </div>
      {modal}
    </PageContainer>
  );
}

export default Home;
