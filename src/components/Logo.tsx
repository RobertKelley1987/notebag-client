import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps) {
  let classNames = "font-bold text-2xl text-black hover:text-aqua";
  if (className) classNames += ` ${className}`;

  return (
    <Link to="/notes" className={classNames}>
      notebag
    </Link>
  );
}

export default Logo;
