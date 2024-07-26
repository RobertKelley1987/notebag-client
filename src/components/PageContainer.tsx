import { useModal } from "../hooks/useModal";
import { useFormOpen } from "../hooks/useFormOpen";
import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

function PageContainer({ children }: PageContainerProps) {
  const { modal } = useModal();
  const { formOpen } = useFormOpen();

  let classNames = "min-h-[100dvh] flex flex-col";
  if (modal || formOpen) {
    classNames += " fixed w-full sm:static";
  }

  return <div className={classNames}>{children}</div>;
}

export default PageContainer;
