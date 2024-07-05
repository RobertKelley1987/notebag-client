import { Link } from "react-router-dom";

function AuthLinks() {
  return (
    <div className="flex gap-3">
      <Link to="/register" className="hover:text-aqua">
        Sign Up
      </Link>
      <Link to="/login" className="hover:text-aqua">
        Log In
      </Link>
    </div>
  );
}

export default AuthLinks;
