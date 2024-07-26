import { useSearchParams } from "react-router-dom";
import { Markup } from "interweave";
import { useNote } from "../../../hooks/useNote";
import NotePinButton from "./NotePinButton";

// Helper to replace search term with highlighted html
function highlightSearch(str: string, search: string) {
  const regEx = new RegExp(search, "gi");
  return str.replaceAll(regEx, (matched) => {
    return `<mark class="group-hover:underline group-hover:text-black text-aqua bg-white bg-opacity-0 ">${matched}</mark>`;
  });
}

function NoteContent() {
  const { note } = useNote();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const search = searchQuery?.toLowerCase().trim();
  let { title, content } = note;

  if (search) {
    title = highlightSearch(title, search);
    content = highlightSearch(content, search);
  }

  return (
    <div className="flex flex-col gap-2">
      {title && (
        <div>
          <NotePinButton />
          <Markup
            tagName="h2"
            content={title}
            className="font-semibold break-words"
          />
        </div>
      )}
      <div>
        {!title && <NotePinButton />}
        {content && (
          <Markup
            tagName="p"
            content={content}
            className="break-words whitespace-pre-wrap"
          />
        )}
      </div>
    </div>
  );
}

export default NoteContent;
