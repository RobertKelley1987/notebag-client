import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

function PageContainer({ children }: PageContainerProps) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}

export default PageContainer;
