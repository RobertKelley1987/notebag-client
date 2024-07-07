import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Note from "./Note";
import type { Note as NoteType } from "../types";

type NoteGridProps = {
  notes: NoteType[];
};

function NoteGrid({ notes }: NoteGridProps) {
  return (
    <div className="w-full my-6">
      <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3, 1100: 4 }}>
        <Masonry gutter="1rem">
          {notes.map((note) => (
            <Note key={note.id} note={note} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default NoteGrid;
