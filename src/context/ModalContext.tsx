import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NoteFormContextProvider from "./NoteFormContext";
import EditedTagContextProvider from "./EditedTagContext";
import DropdownContextProvider from "./DropdownContext";
import TagFormContextProvider from "./TagFormContext";
import EditNotePage from "../pages/EditNotePage";
import TagsPage from "../pages/TagsPage";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Modal } from "../types";

type ModalContextType = {
  modal: ReactNode | null;
  setModal: Dispatch<SetStateAction<Modal>>;
  clickedInside: boolean;
  setClickedInside: Dispatch<SetStateAction<boolean>>;
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
    <TagFormContextProvider>
      <EditedTagContextProvider>
        <TagsPage />
      </EditedTagContextProvider>
    </TagFormContextProvider>
  ),
};

export default function ModalContextProvider({
  children,
}: ModalContextProviderProps) {
  const [modal, setModal] = useState<Modal>("");
  const [clickedInside, setClickedInside] = useState(false);
  const current = modal ? MODAL_PGS[modal] : null;
  const location = useLocation();

  // If user clicks on a tag link, close current modal.
  useEffect(() => {
    setModal("");
  }, [location]);

  return (
    <ModalContext.Provider
      value={{ modal: current, setModal, clickedInside, setClickedInside }}
    >
      {children}
    </ModalContext.Provider>
  );
}
