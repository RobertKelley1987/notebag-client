import { Fragment, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDemo } from "../../hooks/useDemo";
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
import DemoAlert from "./DemoAlert";

function Home() {
  const { isDemo } = useDemo();
  const { isLoading, error, setError } = useInitAppData();
  const { isSmallScreen } = useIsSmallScreen();
  const [menuOpen, setMenuOpen] = useState(true);
  const { modal } = useModal();
  const location = useLocation();

  useLayoutEffect(() => {
    if (isSmallScreen) {
      setMenuOpen(false);
    }
  }, [isSmallScreen, modal, location]);

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
      {isDemo && <DemoAlert />}
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
