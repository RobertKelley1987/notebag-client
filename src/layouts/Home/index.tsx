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

function Home() {
  const { isLoading } = useInitAppData();
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

  function renderApp() {
    return (
      <Fragment>
        {menuOpen && renderMenu()}
        <Main menuOpen={menuOpen} />
        {search === null && <NewNoteButton />}
      </Fragment>
    );
  }

  return (
    <PageContainer>
      <Header setMenuOpen={setMenuOpen} />
      <div className="font-ibm flex basis-full grow sm:justify-end">
        {isLoading ? <Loading /> : renderApp()}
      </div>
      {modal}
    </PageContainer>
  );
}

export default Home;
