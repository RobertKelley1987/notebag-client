import DropdownContextProvider from "../../../context/DropdownContext";
import TagSearchContextProvider from "../../../context/TagSearchContext";
import { useNote } from "../../../hooks/useNote";
import { useUserNotes } from "../../../hooks/useUserNotes";
import { useModal } from "../../../hooks/useModal";
import NoteOptions from "../../../components/NoteOptions";
import NoteTagsTrimmed from "./NoteTagsTrimmed";
import NoteEditTags from "./NoteEditTags";
import NoteDeleteButton from "./NoteDeleteButton";
import NoteContent from "./NoteContent";
import NotePinButton from "./NotePinButton";

function Note() {
  const { note } = useNote();
  const { setSelected } = useUserNotes();
  const { setModal } = useModal();

  const handleClick = () => {
    setSelected(note.id);
    setModal("editNote");
  };

  const noteIsEmpty = !note.title && !note.content;
  const emptyNote = <p className="italic text-slate-400">EMPTY NOTE</p>;

  return (
    <div className="border border-black p-2 has-[article:hover]:bg-aqua has-[a:hover]:border-black">
      <article
        onClick={handleClick}
        className="group cursor-pointer [mark]:text-white"
      >
        <NotePinButton />
        {noteIsEmpty ? emptyNote : <NoteContent />}
        <NoteTagsTrimmed tags={note.tags} />
      </article>
      <DropdownContextProvider>
        <TagSearchContextProvider>
          <NoteOptions
            editTagsForm={<NoteEditTags />}
            deleteButton={<NoteDeleteButton />}
            hideOptions={true}
          />
        </TagSearchContextProvider>
      </DropdownContextProvider>
    </div>
  );
}

export default Note;
