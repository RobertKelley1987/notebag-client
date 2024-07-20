import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

// Hook to confirm modal context is accessed within modal provider.
export function useModal() {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Use ModalContext.Provider to access this context.");
  }

  return modalContext;
}
