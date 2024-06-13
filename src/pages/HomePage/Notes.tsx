import { useContext } from "react";
import UserNotesContext from "../../context/UserNotesContext";
import NoteList from "./NoteList";

function Loading() {
  return (
    <div className="basis-full grow flex justify-center items-center">
      <p className="-translate-y-[50px]">Loading...</p>
    </div>
  );
}

function ZeroNotes() {
  return (
    <div className="basis-full grow flex justify-center items-center">
      <p className="-translate-y-[50px]">You have zero notes.</p>
    </div>
  );
}

export default function Notes() {
  const { userNotes, isLoading } = useContext(UserNotesContext);

  if (isLoading) {
    return <Loading />;
  } else if (userNotes.length === 0) {
    return <ZeroNotes />;
  } else {
    return <NoteList notes={userNotes} />;
  }
}
