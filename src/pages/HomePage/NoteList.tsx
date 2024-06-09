import Masonry from "react-responsive-masonry";
import { useOptimisticNotes } from "../../hooks/useOptimisticNotes";
import Note from "./Note";

function NoteList() {
  const { optimisticNotes } = useOptimisticNotes();

  return (
    <div className="w-[700px] mb-6">
      <Masonry columnsCount={3} gutter="1rem">
        {optimisticNotes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </Masonry>
    </div>
  );
}

export default NoteList;
