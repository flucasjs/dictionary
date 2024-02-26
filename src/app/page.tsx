'use client';

import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import DefinitionList from '../components/DefinitionList';
import {FontContext, FontProvider} from '../context/Font';
import {DefinitionProvider} from '../context/Definition';
import { ValidationProvider } from '../context/Validation';
import { FontContextType } from '../interfaces';

function Wrapper({theme, setTheme}: {theme: string; setTheme: React.Dispatch<React.SetStateAction<string>>}) {
  const {font} = React.useContext(FontContext) as FontContextType;
  return (
    <div className={`${theme} ${font} h-full ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-white text-[#2D2D2D'}`}>
      <Header theme={theme} handleThemeSelection={setTheme} />
      <DefinitionProvider>
        <ValidationProvider>
          <SearchForm />
          <DefinitionList />
        </ValidationProvider>
      </DefinitionProvider>
    </div>
  )
}


export default function Home() {
  const [theme, setTheme] = React.useState<string>('light');
  const [mounted, setMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <FontProvider>
      <Wrapper theme={theme} setTheme={setTheme} />
    </FontProvider>
  );
}
