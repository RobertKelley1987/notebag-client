import { useEffect } from "react";
import DropdownContextProvider from "../../../context/DropdownContext";
import { useNoteForm } from "../../../hooks/useNoteForm";
import { useFormOpen } from "../../../hooks/useFormOpen";
import { useFoundTag } from "../../../hooks/useFoundTag";
import { useCreateNote } from "../../../hooks/useCreateNote";
import NoteFormTitle from "../../../components/NoteForm/NoteFormTitle";
import NoteFormContent from "../../../components/NoteForm/NoteFormContent";
import NoteTags from "../../../components/NoteTags";
import NoteOptions from "../../../components/NoteOptions";
import NoteDropdown from "../../../components/NoteOptions/NoteDropdown";
import NoteFormEditTags from "../../../components/NoteForm/NoteFormEditTags";
import NewNoteDeleteButton from "./NewNoteDeleteButton";
import NoteFormSubmit from "../../../components/NoteForm/NoteFormSubmit";
import TagSearchContextProvider from "../../../context/TagSearchContext";
import NoteFormPinButton from "../../../components/NoteForm/NoteFormPinButton";

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
    <div className="flex flex-col w-full h-full justify-between">
      <div className="w-full relative block">
        <div>
          <NoteFormPinButton />
          <NoteFormTitle />
        </div>
        <NoteFormContent />
        <NoteTags tags={tags} />
      </div>
      <div className="flex w-full justify-between items-center">
        <DropdownContextProvider>
          <TagSearchContextProvider>
            <NoteOptions>
              <NoteDropdown
                editTagsForm={<NoteFormEditTags />}
                deleteButton={<NewNoteDeleteButton />}
              />
            </NoteOptions>
          </TagSearchContextProvider>
        </DropdownContextProvider>
        <NoteFormSubmit submit={createNote} />
      </div>
    </div>
  );
}

export default NewNoteForm;
