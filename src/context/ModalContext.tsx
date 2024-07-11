import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoteFormContextProvider from "./NoteFormContext";
import EditedTagContextProvider from "./EditedTagContext";
import DropdownContextProvider from "./DropdownContext";
import EditNotePage from "../pages/EditNotePage";
import TagsPage from "../pages/TagsPage";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Modal } from "../types";

type ModalContextType = {
  modal: ReactNode | null;
  setModal: Dispatch<SetStateAction<Modal>>;
};

export const ModalContext = createContext<ModalContextType | null>(null);

type ModalContextProviderProps = {
  children: ReactNode;
};

const MODAL_PGS = {
  editNote: (
    <DropdownContextProvider>
      <NoteFormContextProvider>
        <EditNotePage />
      </NoteFormContextProvider>
    </DropdownContextProvider>
  ),
  editTags: (
    <EditedTagContextProvider>
      <TagsPage />
    </EditedTagContextProvider>
  ),
};

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [modal, setModal] = useState<Modal>("");
  const current = modal ? MODAL_PGS[modal] : null;
  const location = useLocation();

  // If user clicks on a tag link, close current modal.
  useEffect(() => {
    setModal("");
  }, [location]);

  return (
    <ModalContext.Provider value={{ modal: current, setModal }}>
      {children}
    </ModalContext.Provider>
  );
}
