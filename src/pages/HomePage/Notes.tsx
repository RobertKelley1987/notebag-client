import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import NoteList from "./NoteList";
import type { Note as NoteType } from "../../types";

export default function Notes() {
  const { notesPromise } = useLoaderData() as {
    notesPromise: Promise<NoteType[]>;
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={notesPromise} errorElement={<p>Server error.</p>}>
        <NoteList />
      </Await>
    </Suspense>
  );
}
