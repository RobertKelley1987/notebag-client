type NoteTagProps = {
  name: string;
};

function NoteTag({ name }: NoteTagProps) {
  return <li className="border border-black p-1">{name}</li>;
}

export default NoteTag;
