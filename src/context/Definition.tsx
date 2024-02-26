import React from 'react';

import {DictionaryAPIData, DictionaryContextType} from '../interfaces';

export const DefinitionContext = React.createContext<DictionaryContextType | null>(null);

export function DefinitionProvider({
  children,
}: React.PropsWithChildren): React.ReactElement<{children: React.ReactNode}> {
  const [definition, setDefinition] = React.useState<DictionaryAPIData>({
    word: '',
    phonetic: '',
    phonetics: [],
    meanings: [],
    license: {name: '', url: ''},
    sourceUrls: [],
  });
  const contextValue = React.useMemo(() => ({definition, setDefinition}), [definition]);
  return <DefinitionContext.Provider value={contextValue}>{children}</DefinitionContext.Provider>;
}
