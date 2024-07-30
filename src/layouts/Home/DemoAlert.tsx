import { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "../../components/icons/CloseIcon";

function DemoAlert() {
  const [isVisible, setIsVisible] = useState(true);

  function renderAlert() {
    return (
      <div className="fixed bottom-0 p-3 left-0 w-screen z-50 bg-white border-black border-t font-ibm flex gap-3 items-start">
        <button
          onClick={() => setIsVisible(false)}
          className="hover:text-aqua pt-[.1rem]"
        >
          <CloseIcon />
        </button>
        <p>
          Welcome to demo mode! Changes made in this demo will not be saved.{" "}
          <Link to="/register" className="hover:text-aqua underline">
            Create an account
          </Link>{" "}
          to create notes and save changes.
        </p>
      </div>
    );
  }

  return isVisible ? renderAlert() : null;
}

export default DemoAlert;
