import { useFormOpen } from "../../hooks/useFormOpen";
import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import NewNote from "./NewNote";
import Notes from "./Notes";
import NewNoteButton from "./NewNoteButton";

type MainProps = {
  menuOpen: boolean;
};

function Main({ menuOpen }: MainProps) {
  const { formOpen } = useFormOpen();
  const { isSmallScreen } = useIsSmallScreen();

  const width = menuOpen ? "w-[calc(100%-300px)]" : "w-full";
  const button = !isSmallScreen && <NewNoteButton />;

  return (
    <main
      className={`${width} h-[calc(100%-60px)] min-h-[calc(100vh-60px-1.5rem)] translate-y-[60px] flex flex-col text-black items-center px-3 sm:px-6 mt-6`}
    >
      {formOpen ? <NewNote /> : button}
      <Notes />
    </main>
  );
}

export default Main;
