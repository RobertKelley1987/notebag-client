import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="font-bold text-2xl text-black hover:text-aqua">
      notebag
    </Link>
  );
}

export default Logo;
