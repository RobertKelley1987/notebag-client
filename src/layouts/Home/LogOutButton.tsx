import { useNavigate } from "react-router-dom";
import users from "../../services/users";

type LogOutButtonProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function LogOutButton({ setIsLoading }: LogOutButtonProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    setIsLoading(true);

    const tokens = sessionStorage.getItem("tokens");
    const refreshToken = tokens ? JSON.parse(tokens).refreshToken : "";
    await users.logOut(refreshToken);
    sessionStorage.setItem("tokens", "");

    setIsLoading(false);
    navigate("/login");
  };

  return (
    <button
      type="submit"
      name="intent"
      value="log out"
      className="whitespace-nowrap"
      onClick={handleClick}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
