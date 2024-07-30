import { useNavigate } from "react-router-dom";
import { useDemo } from "../../../hooks/useDemo";
import users from "../../../services/users";

type LogOutButtonProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function LogOutButton({ setIsLoading }: LogOutButtonProps) {
  const { isDemo } = useDemo();
  const navigate = useNavigate();

  const handleClick = async () => {
    // If not in demo mode, log out user.
    if (!isDemo) {
      setIsLoading(true);
      await users.logOut();
      setIsLoading(false);
    }

    // Return to login page.
    navigate("/login");
  };

  return (
    <button
      type="submit"
      name="intent"
      value="log out"
      className="whitespace-nowrap cursor-pointer hover:text-aqua"
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
