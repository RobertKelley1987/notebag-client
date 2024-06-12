import { Link } from "react-router-dom";

function AuthLinks() {
  return (
    <div className="flex gap-3">
      <Link to="/register">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
}

export default AuthLinks;
