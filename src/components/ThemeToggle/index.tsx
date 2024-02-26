import React from 'react';

export default function ThemeToggle({
  theme,
  handleThemeSelection,
}: {
  theme: string;
  handleThemeSelection: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center justify-center">
      <span id="night-mode" className="hidden">
        Night Mode
      </span>

      <button
        type="button"
        className="flex items-center gap-x-3 px-3 py-1"
        role="switch"
        aria-checked="true"
        aria-labelledby="night-mode"
        onClick={() =>
          handleThemeSelection(
            currentTheme => (localStorage.theme = currentTheme === 'dark' ? 'light' : 'dark')
          )
        }
      >
        <div className="h-5 w-10 rounded-full bg-[#A445ED] flex items-center p-[3px]">
          <div className={`h-[14px] w-[14px] rounded-full bg-white ${theme === 'dark' ? 'ml-auto' : 'mr-auto'}`} />
        </div>
        <div className="text-[#757575] dark:text-[#A445ED]">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
