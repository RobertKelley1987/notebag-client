import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="w-[350px] flex flex-col p-6 gap-3">
      <Link to="/">Notes</Link>
      <Link to="/tags">Edit Tags</Link>
    </div>
  );
}

export default Menu;
