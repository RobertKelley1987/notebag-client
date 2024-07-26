import { useIsSmallScreen } from "../../hooks/useIsSmallScreen";
import { useFormOpen } from "../../hooks/useFormOpen";
import PlusIcon from "../../components/icons/PlusIcon";
import { Fragment, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";

const mobileText = (
  <Fragment>
    <PlusIcon />
    new note
  </Fragment>
);

const desktopText = "new note...";

function NewNoteButton() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const searching = search !== null;
  const { isSmallScreen } = useIsSmallScreen();
  const { setFormOpen } = useFormOpen();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setFormOpen(true);
  }

  const text = isSmallScreen ? mobileText : desktopText;

  function renderButton() {
    return (
      <button
        id="new-note-button"
        onClick={handleClick}
        className="font-ibm fixed sm:static flex sm:w-[300px] bg-white gap-1 right-0 bottom-0 mr-6 mb-6 sm:m-0 p-3 pl-2 border border-black hover:bg-aqua"
      >
        {text}
      </button>
    );
  }

  return !searching ? renderButton() : null;
}

export default NewNoteButton;
