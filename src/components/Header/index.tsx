import React from 'react';
import Image from 'next/image';
import FontMenu from '../FontMenu';
import ThemeToggle from '../ThemeToggle';
import logo from '../../assets/svg/logo.svg';

export default function Header({
  theme,
  handleThemeSelection,
}: {
  theme: string;
  handleThemeSelection: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <header className="container py-6 md:py-[3.75rem] dark:bg-[#050505] dark:text-white max-w-full">
      <div className="flex items-center">
        <div className="mr-auto h-8 md:w-8">
          <Image src={logo} alt="" priority />
        </div>
        <div className="flex gap-x-1">
          <FontMenu />
          <div className="w-[1px] bg-[#E9E9E9]" />
          <ThemeToggle theme={theme} handleThemeSelection={handleThemeSelection} />
        </div>
      </div>
    </header>
  );
}
