import { Link } from "react-router-dom";
import { useDemo } from "../hooks/useDemo";

type LogoProps = {
  className?: string;
};

function Logo({ className }: LogoProps) {
  const { isDemo } = useDemo();

  let classNames = "font-bold font-sans text-2xl text-black hover:text-aqua";
  if (className) classNames += ` ${className}`;

  return (
    <Link to={isDemo ? "/demo" : "/notes"} className={classNames}>
      notebag
    </Link>
  );
}

export default Logo;
