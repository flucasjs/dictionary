import React from 'react';
import Image from 'next/image';
import downArrow from '../../assets/svg/icon-arrow-down.svg';
import {FontContext} from '../../context/Font';
import {FontContextType} from '../../interfaces';
import useOutsideClick from '@/hooks/useOutsideClick';
import { REGISTERED_FONTS, DEFAULT_FONT } from '../../constants';

export default function FontMenu() {
  const [menuExpanded, setMenuExpanded] = React.useState<boolean>(false);
  const {font, setFont} = React.useContext(FontContext) as FontContextType;
  const [triggerRef, menuRef] = useOutsideClick(setMenuExpanded);

  const handleFontSelection = React.useCallback(
    (selectedFont: string) => {
      localStorage.userFont = selectedFont;
      setFont(selectedFont);
    },
    [setFont]
  );

  React.useEffect(() => {
    if ('selectedFont' in localStorage) {
      const {selectedFont} = localStorage;
      setFont(selectedFont in REGISTERED_FONTS ? selectedFont : DEFAULT_FONT);
    }
  }, [setFont]);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-x-4 px-3 py-1 "
        aria-haspopup="menu"
        aria-expanded={menuExpanded}
        onClick={() => setMenuExpanded(v => !v)}
        ref={triggerRef}
      >
        <span className={`${font} text-[0.875rem] font-bold md:text-[1.125rem]`}>
          {REGISTERED_FONTS[font]}
        </span>
        <Image src={downArrow} width={12} height={6} alt="" className="select-none" />
      </button>
      {menuExpanded ? (
        <ul
          ref={menuRef}
          className={`absolute right-2 top-[125%] z-[500] flex min-w-[16ch] max-w-[20ch] flex-col gap-y-[14px] rounded-[18px] p-6 text-left shadow-[0_5px_30px_0_rgba(0,0,0,.1)] ${'dark:bg-[#1F1F1F] dark:shadow-[0_5px_30px_0_rgba(164,69,237,1)]'}`}
          aria-labelledby="fonts-menu-button"
        >
          <li>
            <button
              className="font-sans text-[14px] font-bold hover:text-[#A445ED]"
              type="button"
              onClick={() => handleFontSelection('font-sans')}
            >
              Sans Serif
            </button>
          </li>
          <li>
            <button
              className="font-serif text-[14px] font-bold hover:text-[#A445ED]"
              type="button"
              onClick={() => handleFontSelection('font-serif')}
            >
              Serif
            </button>
          </li>
          <li>
            <button
              className="font-mono text-[14px] font-bold hover:text-[#A445ED]"
              type="button"
              onClick={() => handleFontSelection('font-mono')}
            >
              Mono
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
