import { createPortal } from "react-dom";
import { useModal } from "../hooks/useModal";
import type { MouseEvent, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  handleDismiss?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

function Modal({ children, handleDismiss, className }: ModalProps) {
  const { clickedInside, setClickedInside } = useModal();

  function handleMouseUp(e: MouseEvent<HTMLDivElement>) {
    if (handleDismiss && !clickedInside) {
      handleDismiss(e);
    }
    setClickedInside(false);
  }

  let classNames = `fixed z-40 top-0 left-0 h-[100dvh] w-full bg-black bg-opacity-50 flex justify-center items-center`;
  if (className) {
    classNames += " " + className;
  }

  return createPortal(
    <div id="modal" onMouseUp={handleMouseUp} className={classNames}>
      {children}
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
