import { useSearchParams } from "react-router-dom";
import ArrowIcon from "../../../components/icons/ArrowIcon";

function CancelSearchButton() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <button onClick={() => setSearchParams("")} className="hover:text-aqua">
      <ArrowIcon className="sm:hidden" />
    </button>
  );
}

export default CancelSearchButton;
