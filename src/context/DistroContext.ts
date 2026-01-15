import { createContext, useContext } from "react";
import type { Distro } from "../types/distro";

interface DistroContextValue {
  distros: Distro[];
}

export const DistroContext = createContext<DistroContextValue>({
  distros: [],
});

export const useDistros = () => useContext(DistroContext);
