"use client";

import { createContext } from "react";
import useLocalStorage from "@/app/hooks/useLocalStorage";

export const EncounterContext = createContext([]);

export default function EncounterProvider({ children }) {
  const [encounters, setEncounters] = useLocalStorage("encounters", []);

  return (
    <EncounterContext.Provider value={{ encounters, setEncounters }}>
      {children}
    </EncounterContext.Provider>
  );
}
