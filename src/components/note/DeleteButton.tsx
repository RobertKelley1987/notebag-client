import type { ButtonHTMLAttributes } from "react";

function DeleteButton({ onClick }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={onClick} className="hover:text-aqua">
      Delete Note
    </button>
  );
}

export default DeleteButton;
