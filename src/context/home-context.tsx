"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type HomeContextValue = {
  selectedPhoneId: string | null;
  openPhone: (id: string) => void;
  closePhone: () => void;
};

const HomeContext = createContext<HomeContextValue | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);

  return (
    <HomeContext.Provider
      value={{
        selectedPhoneId,
        openPhone: setSelectedPhoneId,
        closePhone: () => setSelectedPhoneId(null),
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error("useHome must be used inside HomeProvider");
  }

  return context;
}
