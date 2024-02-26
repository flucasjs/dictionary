import React from "react";

export default function useOutsideClick(callback: React.Dispatch<React.SetStateAction<boolean>>) {
  const menuRef = React.useRef<any>(null);
  const triggerRef = React.useRef<any>(null);

  const handleOutsideClick = React.useCallback(
    (e: Event) => {
      if (triggerRef.current && triggerRef.current.contains(e.target as HTMLElement)) {
        callback(v => !v);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as HTMLElement)) {
        callback(false);
      }
    }, [callback]);

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  });

  return [triggerRef, menuRef];
}