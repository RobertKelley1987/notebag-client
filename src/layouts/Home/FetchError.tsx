import type { Dispatch, SetStateAction } from "react";

type FetchErrorProps = {
  setError: Dispatch<SetStateAction<boolean>>;
};

function FetchError({ setError }: FetchErrorProps) {
  return (
    <div className="basis-full grow flex justify-center items-center">
      <p>
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
