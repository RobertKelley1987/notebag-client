import { useUserTags } from "../../hooks/useUserTags";
import TagCheckbox from "./TagCheckbox";

function EditNoteTags() {
  const { userTags } = useUserTags();

  return (
    <form>
      <fieldset>
        <legend>Note Tags</legend>
        {userTags.map((tag) => (
          <TagCheckbox tag={tag} />
        ))}
      </fieldset>
    </form>
  );
}

export default EditNoteTags;
