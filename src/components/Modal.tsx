import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  handleDismiss: (e: React.MouseEvent<HTMLDivElement>) => void;
  rootId: string;
  className?: string;
};

function Modal({ children, handleDismiss, rootId, className }: ModalProps) {
  let classNames = `fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex justify-center items-center`;
  if (className) {
    classNames += " " + className;
  }
  return createPortal(
    <div id="modal" onClick={handleDismiss} className={classNames}>
      {children}
    </div>,
    document.getElementById(rootId) as HTMLElement
  );
}

export default Modal;
