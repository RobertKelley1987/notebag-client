import { Fragment, useLayoutEffect, useState } from "react";
import { useInitAppData } from "../../hooks/useInitAppData";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import { useModal } from "../../hooks/useModal";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import Loading from "./Loading";
import MobileMenu from "./MobileMenu";
import Main from "./Main";
import FetchError from "./FetchError";
import NewNoteButton from "./NewNoteButton";

function Home() {
  const { isLoading, error, setError } = useInitAppData();
  const { isSmallScreen } = useIsSmallScreen();
  const [menuOpen, setMenuOpen] = useState(true);
  const { modal } = useModal();

  useLayoutEffect(() => {
    if (isSmallScreen) {
      setMenuOpen(false);
    }
  }, [isSmallScreen]);

  function renderMenu() {
    if (isSmallScreen) {
      return <MobileMenu handleDismiss={() => setMenuOpen(false)} />;
    } else {
      return <Menu />;
    }
  }

  function renderApp() {
    return (
      <Fragment>
        {menuOpen && renderMenu()}
        <Main menuOpen={menuOpen} />
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
      {isSmallScreen && <NewNoteButton />}
      {modal}
    </PageContainer>
  );
}

export default Home;
