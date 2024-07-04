import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import NewNoteForm from "./NewNoteForm";
import Notes from "./Notes";

function Home() {
  const [menuOpen, setMenuOpen] = useState(true);
  const { Modal } = useContext(ModalContext);

  return (
    <PageContainer>
      <Header setMenuOpen={setMenuOpen} />
      <div className="font-ibm flex basis-full grow">
        {menuOpen && <Menu />}
        <main className="relative text-black items-center flex flex-col flex flex-col basis-full grow px-6">
          <NewNoteForm />
          <Notes />
        </main>
      </div>
      {Modal}
    </PageContainer>
  );
}

export default Home;
