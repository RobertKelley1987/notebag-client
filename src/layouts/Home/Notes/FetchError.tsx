import { Link, useLocation } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

type FetchErrorProps = {
  setError: Dispatch<SetStateAction<boolean>>;
};

function FetchError({ setError }: FetchErrorProps) {
  const location = useLocation();

  return (
    <div className="basis-full grow flex justify-center items-center">
      <p className="-translate-y-[50px]">
        Failed to fetch notes from server.{" "}
        <button
          onClick={() => setError(false)}
          className="underline hover:text-aqua"
        >
          Try again
        </button>
        .
      </p>
    </div>
  );
}

export default FetchError;
