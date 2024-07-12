import { createContext } from "react";
import type { ReactNode } from "react";
import { useScreenSize } from "../hooks/useScreenSize";

type ScreenSizeContextType = {
  isSmallScreen: boolean;
};

export const ScreenSizeContext = createContext<ScreenSizeContextType | null>(
  null
);

type ScreenSizeContextProviderProps = {
  children: ReactNode;
};

function ScreenSizeContextProvider({
  children,
}: ScreenSizeContextProviderProps) {
  const { isSmallScreen } = useScreenSize();

  return (
    <ScreenSizeContext.Provider value={{ isSmallScreen }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

export default ScreenSizeContextProvider;
