"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type SmartphoneDetailContextValue = {
  selectedPhoneId: string | null;
  openPhone: (id: string) => void;
  closePhone: () => void;
};

const SmartphoneDetailContext =
  createContext<SmartphoneDetailContextValue | null>(null);

type SmartphoneDetailProviderProps = {
  children: ReactNode;
};

export function SmartphoneDetailProvider({
  children,
}: SmartphoneDetailProviderProps) {
  const [selectedPhoneId, setSelectedPhoneId] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      selectedPhoneId,
      openPhone: setSelectedPhoneId,
      closePhone: () => setSelectedPhoneId(null),
    }),
    [selectedPhoneId]
  );

  return (
    <SmartphoneDetailContext.Provider value={value}>
      {children}
    </SmartphoneDetailContext.Provider>
  );
}

export function useSmartphoneDetail() {
  const context = useContext(SmartphoneDetailContext);

  if (!context) {
    throw new Error(
      "useSmartphoneDetail must be used inside SmartphoneDetailProvider"
    );
  }

  return context;
}
