import { useState } from "react";
import { ModalContext } from "./ModalContext";
import EditNotePage from "../pages/EditNotePage/EditNotePage";
import TagsPage from "../pages/TagsPage";
import type { ReactNode } from "react";
import type { Modal } from "../types";

type ModalContextProviderProps = {
  children: ReactNode;
};

const MODAL_PGS = {
  note: <EditNotePage />,
  tags: <TagsPage />,
};

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [modal, setModal] = useState<Modal>("");
  const Modal = modal ? MODAL_PGS[modal] : null;

  return (
    <ModalContext.Provider value={{ Modal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}
