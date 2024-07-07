import type { ButtonHTMLAttributes } from "react";

function DeleteButton({
  onClick,
  className,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  let classNames = "hover:text-aqua";
  if (className) classNames += ` ${className}`;

  return (
    <button onClick={onClick} className={classNames}>
      Delete Note
    </button>
  );
}

export default DeleteButton;
