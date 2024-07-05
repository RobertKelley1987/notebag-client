import { createContext } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Modal } from "../types";

type ModalContextType = {
  modal: ReactNode | null;
  setModal: Dispatch<SetStateAction<Modal>>;
};

const DEFAULT_CONTEXT = {
  modal: null,
  setModal: () => null,
};

export const ModalContext = createContext<ModalContextType>(DEFAULT_CONTEXT);
