import { Fragment, useLayoutEffect } from "react";
import TagSearchContextProvider from "../../context/TagSearchContext";
import { NoteContext } from "../../context/NoteContext";
import { useNoteForm } from "../../hooks/useNoteForm";
import { useSelectedNote } from "../../hooks/useSelectedNote";
import { useUserNotes } from "../../hooks/useUserNotes";
import { useUpdateNote } from "../../hooks/useUpdateNote";
import NoteFormContent from "../../components/NoteForm/NoteFormContent";
import NoteFormTitle from "../../components/NoteForm/NoteFormTitle";
import NoteTags from "../../components/NoteTags";
import NoteOptions from "../../components/NoteOptions";
import NoteDropdown from "../../components/NoteOptions/NoteDropdown";
import NoteFormEditTags from "../../components/NoteForm/NoteFormEditTags";
import NoteDeleteButton from "../../layouts/Home/Note/NoteDeleteButton";
import NoteFormSubmit from "../../components/NoteForm/NoteFormSubmit";
import NoteFormPinButton from "../../components/NoteForm/NoteFormPinButton";

function EditNoteForm() {
  const { tags, setForm } = useNoteForm();
  const { selectedNote } = useSelectedNote();
  const { setSelected } = useUserNotes();
  const updateNote = useUpdateNote();

  // Set form values to selected note and focus input on first render
  useLayoutEffect(() => {
    if (selectedNote) setForm(selectedNote);

    return () => setSelected("");
  }, []);

  return (
    <Fragment>
      <div className="overflow-y-auto p-3 sm:mb-9">
        <div className="flex justify-between">
          <NoteFormTitle />
          <NoteFormPinButton />
        </div>
        <NoteFormContent />
        <NoteTags tags={tags} />
      </div>
      <div className="flex w-full justify-between items-center sm:absolute sm:left-0 sm:bottom-0 p-2">
        <TagSearchContextProvider>
          <NoteContext.Provider value={{ note: selectedNote }}>
            <NoteOptions>
              <NoteDropdown
                editTagsForm={<NoteFormEditTags />}
                deleteButton={<NoteDeleteButton />}
              />
            </NoteOptions>
          </NoteContext.Provider>
        </TagSearchContextProvider>
        <NoteFormSubmit submit={updateNote} />
      </div>
    </Fragment>
  );
}

export default EditNoteForm;
