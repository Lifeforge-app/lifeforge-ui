import clsx from "clsx";
import React from "react";
import { GoBackButton } from "@components/buttons";
import { Scrollbar } from "@components/utilities";

function SidebarWrapper({
  isOpen,
  setOpen,
  customHeight,
  children,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  customHeight?: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <aside
      className={clsx(
        "bg-bg-50 shadow-custom dark:bg-bg-900 xl:bg-bg-50/50 xl:dark:bg-bg-900/50 absolute top-0 z-9990 size-full shrink-0 rounded-lg py-4 backdrop-blur-xs transition-all duration-300 xl:static xl:w-1/4 xl:min-w-96 xl:backdrop-blur-xs",
        isOpen ? "left-0" : "left-full",
        customHeight ?? "xl:h-[calc(100%-2rem)]"
      )}
    >
      <Scrollbar>
        <div className="flex-between flex px-8 py-4 xl:hidden">
          <GoBackButton
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
        <ul className="flex size-full min-w-0 flex-col">{children}</ul>
      </Scrollbar>
    </aside>
  );
}

export default SidebarWrapper;
