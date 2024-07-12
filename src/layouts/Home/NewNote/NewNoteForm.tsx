import { useEffect } from "react";
import DropdownContextProvider from "../../../context/DropdownContext";
import { useNoteForm } from "../../../hooks/useNoteForm";
import { useFormOpen } from "../../../hooks/useFormOpen";
import { useFoundTag } from "../../../hooks/useFoundTag";
import { useCreateNote } from "../../../hooks/useCreateNote";
import TitleInput from "../../../components/NoteForm/NoteFormTitle";
import ContentInput from "../../../components/NoteForm/NoteFormContent";
import NoteTags from "../../../components/NoteTags";
import NoteOptions from "../../../components/NoteOptions";
import NoteFormEditTags from "../../../components/NoteForm/NoteFormEditTags";
import NewNoteDeleteButton from "./NewNoteDeleteButton";
import NoteFormSubmit from "../../../components/NoteForm/NoteFormSubmit";
import TagSearchContextProvider from "../../../context/TagSearchContext";

function NewNoteForm() {
  const { tags, setTags } = useNoteForm();
  const { formOpen } = useFormOpen();
  const { foundTag } = useFoundTag();
  const createNote = useCreateNote();

  useEffect(() => {
    const tags = foundTag ? [foundTag] : [];
    setTags(tags);
  }, [foundTag, formOpen]);

  return (
    <div className="grid grid-rows-[auto_min-content] w-full h-full">
      <div>
        <TitleInput />
        <ContentInput />
        <NoteTags tags={tags} />
      </div>
      <div className="flex w-full justify-between items-center">
        <DropdownContextProvider>
          <TagSearchContextProvider>
            <NoteOptions
              editTagsForm={<NoteFormEditTags />}
              deleteButton={<NewNoteDeleteButton />}
            />
          </TagSearchContextProvider>
        </DropdownContextProvider>
        <NoteFormSubmit submit={createNote} />
      </div>
    </div>
  );
}

export default NewNoteForm;
