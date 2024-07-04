import { Fragment, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import UserIcon from "../../../components/icons/UserIcon";
import LogOutButton from "./LogOutButton";

function UserSettings() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { wrapperRef } = useClickOutside(handleClick);

  function handleClick() {
    setDropdownOpen(false);
  }

  const renderUserSettings = () => {
    return (
      <Fragment>
        <UserIcon
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="hover:text-aqua"
        />
        {dropdownOpen && (
          <div className="absolute top-8 right-7 border border-black bg-white p-3">
            <LogOutButton setIsLoading={setIsLoading} />
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <div ref={wrapperRef} className="relative hover:cursor-pointer">
      {isLoading ? (
        <span className="hover:cursor-auto">Logging out...</span>
      ) : (
        renderUserSettings()
      )}
    </div>
  );
}

export default UserSettings;
