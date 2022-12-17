import { useDisclosure } from "@chakra-ui/core";
import { createContext } from "react";

interface SidebarDrawerProviderProps {
  children: React.ReactNode;
}

const SidebarDrawerContext = createContext({});

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();

  return(
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}
