import { useNavigate } from "react-router-dom";
import users from "../../../services/users";

type LogOutButtonProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function LogOutButton({ setIsLoading }: LogOutButtonProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);
    await users.logOut();
    setIsLoading(false);
    navigate("/login");
  };

  return (
    <button
      type="submit"
      name="intent"
      value="log out"
      className="whitespace-nowrap hover:cursor-pointer hover:text-aqua"
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
