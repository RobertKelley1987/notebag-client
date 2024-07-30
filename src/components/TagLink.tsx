import { Link } from "react-router-dom";
import { useDemo } from "../hooks/useDemo";
import type { MouseEvent, ReactNode } from "react";

type TagLinkProps = {
  name: string;
  onClick?: (e: MouseEvent) => void;
  className: string;
  children: ReactNode;
};
function TagLink({ name, className, onClick, children }: TagLinkProps) {
  const { isDemo } = useDemo();
  const rootURL = isDemo ? "demo" : "notes";

  return (
    <Link
      to={`/${rootURL}?tag=${name}`}
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}

export default TagLink;
