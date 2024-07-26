import { useSearchParams } from "react-router-dom";

function ZeroNotes() {
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  function renderMessage() {
    return tagFilter
      ? "You have zero notes with this tag."
      : "You have zero notes.";
  }

  return (
    <div className="basis-full grow flex justify-center items-center">
      <p className="text-center -translate-y-[1.5rem]">{renderMessage()}</p>
    </div>
  );
}

export default ZeroNotes;
