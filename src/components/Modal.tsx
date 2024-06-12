import { useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  handleDismiss: () => void;
};

function Modal({ children, handleDismiss }: ModalProps) {
  return createPortal(
    <div
      onClick={handleDismiss}
      className="absolute top-0 left-0 min-h-screen min-w-screen w-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      {children}
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}

export default Modal;
