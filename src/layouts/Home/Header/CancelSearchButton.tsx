import { useSearchParams } from "react-router-dom";
import BackArrowIcon from "../../../components/icons/BackArrowIcon";

function CancelSearchButton() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <button onClick={() => setSearchParams("")} className="hover:text-aqua">
      <BackArrowIcon className="sm:hidden" />
    </button>
  );
}

export default CancelSearchButton;
