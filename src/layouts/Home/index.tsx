import { useContext, useState } from "react";
import PageContainer from "../../components/PageContainer";
import Header from "./Header";
import Menu from "./Menu";
import NewNoteForm from "./NewNoteForm";
import Notes from "./Notes";
import { ModalContext } from "../../context/ModalContext";

function Home() {
  const [menuOpen, setMenuOpen] = useState(true);
  const { Modal } = useContext(ModalContext);

  return (
    <PageContainer>
      <Header setMenuOpen={setMenuOpen} />
      <div className="font-ibm flex basis-full grow">
        {menuOpen && <Menu />}
        <main className="text-black items-center flex flex-col flex flex-col basis-full grow px-6">
          <NewNoteForm />
          <Notes />
        </main>
      </div>
      {Modal}
    </PageContainer>
  );
}

export default Home;
