import DropdownContextProvider from "../../context/DropdownContext";
import TagSearchContextProvider from "../../context/TagSearchContext";
import { NoteContext } from "../../context/NoteContext";
import { useUserNotes } from "../../hooks/useUserNotes";
import { useModal } from "../../hooks/useModal";
import NoteOptions from "../NoteOptions";
import NoteTagsTrimmed from "./NoteTagsTrimmed";
import NoteEditTags from "./NoteEditTags";
import NoteDeleteButton from "./NoteDeleteButton";
import NoteContent from "./NoteContent";
import type { Note as NoteType } from "../../types";

type NoteProps = {
  note: NoteType;
};

function Note({ note }: NoteProps) {
  const { setSelected } = useUserNotes();
  const { setModal } = useModal();

  const handleClick = () => {
    setSelected(note.id);
    setModal("editNote");
  };

  const emptyNote = <p className="italic text-slate-400">EMPTY NOTE</p>;

  return (
    <div className="border border-black p-2 has-[article:hover]:bg-aqua has-[a:hover]:border-black">
      <article
        onClick={handleClick}
        className="group cursor-pointer [mark]:text-white"
      >
        {!note.title && !note.content ? emptyNote : <NoteContent note={note} />}
        <NoteTagsTrimmed tags={note.tags} />
      </article>
      <DropdownContextProvider>
        <TagSearchContextProvider>
          <NoteContext.Provider value={{ note }}>
            <NoteOptions
              editTagsForm={<NoteEditTags />}
              deleteButton={<NoteDeleteButton />}
              hideOptions={true}
            />
          </NoteContext.Provider>
        </TagSearchContextProvider>
      </DropdownContextProvider>
    </div>
  );
}

export default Note;
