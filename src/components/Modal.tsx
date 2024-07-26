import { useState } from "react";
import { createPortal } from "react-dom";
import type { MouseEvent, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  handleDismiss?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
};

function Modal({ children, handleDismiss, className }: ModalProps) {
  let classNames = `fixed z-40 top-0 left-0 h-[100dvh] w-full bg-black bg-opacity-50 flex justify-center items-center`;
  if (className) {
    classNames += " " + className;
  }

  return createPortal(
    <div id="modal" onClick={handleDismiss} className={classNames}>
      {children}
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
