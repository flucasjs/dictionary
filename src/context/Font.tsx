import React from "react";
import { FontContextType } from "../interfaces";
import { DEFAULT_FONT } from "../constants";

export const FontContext = React.createContext<FontContextType | string>(DEFAULT_FONT);

export function FontProvider({ children }: React.PropsWithChildren): React.ReactElement<{children: React.ReactNode}> {
  const [font, setFont] = React.useState<string>(DEFAULT_FONT);

  const contextValue = React.useMemo(() => ({font, setFont}), [font]);
  
  return (
    <FontContext.Provider value={contextValue}>
      {children}
    </FontContext.Provider>
  )
}