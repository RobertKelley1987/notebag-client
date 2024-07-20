import { useSearchParams } from "react-router-dom";
import NoteFormContextProvider from "../../context/NoteFormContext";
import NewNote from "./NewNote";
import Notes from "./Notes";

type MainProps = {
  menuOpen: boolean;
};

function Main({ menuOpen }: MainProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const searching = search !== null;

  const width = menuOpen ? "w-[calc(100%-300px)]" : "w-full";

  return (
    <main
      className={`${width} h-[calc(100%-60px)] translate-y-[60px] relative text-black items-center flex flex-col px-3 sm:px-6 mt-6`}
    >
      {!searching && (
        <NoteFormContextProvider>
          <NewNote />
        </NoteFormContextProvider>
      )}
      <Notes />
    </main>
  );
}

export default Main;
