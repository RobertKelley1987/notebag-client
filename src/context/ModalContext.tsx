import { createContext } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Modal } from "../types";

type ModalContextType = {
  Modal: ReactNode | null;
  setModal: Dispatch<SetStateAction<Modal>>;
};

const DEFAULT_CONTEXT = {
  Modal: null,
  setModal: () => null,
};

export const ModalContext = createContext<ModalContextType>(DEFAULT_CONTEXT);
