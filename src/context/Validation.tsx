import React from 'react';

export const ValidationContext = React.createContext<ValidationContextType | null>(null);

export interface ValidationContextType {
  validation: Validation;
  setValidation: React.Dispatch<React.SetStateAction<Validation>>;
}

export interface Validation {
  validated: boolean;
  message?: ValidationMessage;
}

export interface ValidationMessage {
  title: string;
  message?: string;
  resolution?: string;
}

export function ValidationProvider({
  children,
}: React.PropsWithChildren): React.ReactElement<{children: React.ReactNode}> {
  const [validation, setValidation] = React.useState<Validation>({
    validated: false
  });
  const contextValue = React.useMemo(() => ({validation, setValidation}), [validation]);
  return <ValidationContext.Provider value={contextValue}>{children}</ValidationContext.Provider>;
}
