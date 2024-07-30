import { createContext } from "react";

type DemoContextType = {
  isDemo: boolean;
};

export const DemoContext = createContext<DemoContextType | null>(null);
