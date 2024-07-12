import { Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import { Markup } from "interweave";
import type { Note } from "../../types";

// Helper to replace search term with highlighted html
function highlightSearch(str: string, search: string) {
  const regEx = new RegExp(search, "gi");
  return str.replaceAll(regEx, (matched) => {
    return `<mark class="group-hover:underline group-hover:text-black text-aqua bg-white bg-opacity-0 ">${matched}</mark>`;
  });
}

type NoteContentProps = {
  note: Note;
};

function NoteContent({ note }: NoteContentProps) {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  let { title, content } = note;

  if (search) {
    title = highlightSearch(title, search);
    content = highlightSearch(content, search);
  }

  return (
    <Fragment>
      {title && (
        <Markup
          tagName="h2"
          content={title}
          className="font-semibold break-words"
        />
      )}
      {content && (
        <Markup
          tagName="p"
          content={content}
          className="break-words whitespace-pre-wrap"
        />
      )}
    </Fragment>
  );
}

export default NoteContent;
