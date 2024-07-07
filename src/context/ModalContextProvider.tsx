import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ModalContext } from "./ModalContext";
import EditedTagContextProvider from "./EditedTagContextProvider";
import TagNameContextProvider from "./TagNameContextProvider";
import EditNotePage from "../pages/EditNotePage";
import TagsPage from "../pages/TagsPage";
import type { ReactNode } from "react";
import type { Modal } from "../types";

type ModalContextProviderProps = {
  children: ReactNode;
};

const MODAL_PGS = {
  note: <EditNotePage />,
  tags: (
    <EditedTagContextProvider>
      <TagNameContextProvider>
        <TagsPage />
      </TagNameContextProvider>
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
