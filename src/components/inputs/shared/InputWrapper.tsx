import clsx from "clsx";
import React from "react";
import useThemeColors from "@hooks/useThemeColor";

function InputWrapper({
  darker = false,
  className = "",
  disabled = false,
  inputRef,
  children,
}: {
  darker?: boolean;
  className?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  children: React.ReactNode;
}) {
  const { componentBgWithHover, componentBgLighterWithHover } =
    useThemeColors();

  function focusInput(e: React.MouseEvent | React.FocusEvent) {
    if ((e.target as HTMLElement).tagName === "BUTTON") {
      return;
    }

    if (inputRef?.current !== undefined && inputRef.current !== null) {
      inputRef.current.focus();
      if ((e.target as HTMLElement).tagName !== "INPUT") {
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length
        );
      }
    }
  }

  return (
    <div
      className={clsx(
        "group border-bg-500 bg-bg-200/50 shadow-custom focus-within:!border-custom-500 hover:bg-bg-200 relative flex shrink-0 items-center gap-1 rounded-t-lg border-b-2 pl-6 transition-all",
        darker ? componentBgLighterWithHover : componentBgWithHover,
        className,
        disabled ? "pointer-events-none! opacity-50" : "cursor-text"
      )}
      role="button"
      tabIndex={0}
      onClick={focusInput}
      onFocus={focusInput}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if (inputRef?.current !== undefined && inputRef.current !== null) {
            inputRef.current.focus();
          }
        }
      }}
    >
      {children}
    </div>
  );
}

export default InputWrapper;
