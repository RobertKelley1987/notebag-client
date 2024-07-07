import { Link } from "react-router-dom";

function AuthLinks() {
  return (
    <div className="flex gap-6">
      <Link to="/register" className="hover:text-aqua lowercase">
        Sign Up
      </Link>
      <Link to="/login" className="hover:text-aqua lowercase">
        Log In
      </Link>
    </div>
  );
}

export default AuthLinks;
