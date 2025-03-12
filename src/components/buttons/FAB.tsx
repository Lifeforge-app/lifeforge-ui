import clsx from "clsx";
import React from "react";
import Button from "./Button";

function FAB({
  onClick,
  icon = "tabler:plus",
  text = "",
  hideWhen = "sm",
  alwaysShow = false,
  as,
  isRed,
  loading,
}: {
  onClick?: () => void;
  icon?: string;
  hideWhen?: "sm" | "md" | "lg" | "xl";
  alwaysShow?: boolean;
  text?: string;
  as?: React.ElementType;
  isRed?: boolean;
  loading?: boolean;
}) {
  return (
    <Button
      as={as ?? "button"}
      className={clsx(
        "fixed right-6 bottom-6 z-10 shadow-lg",
        !alwaysShow &&
          {
            sm: "sm:hidden",
            md: "md:hidden",
            lg: "lg:hidden",
            xl: "xl:hidden",
          }[hideWhen]
      )}
      icon={icon}
      isRed={isRed}
      loading={loading}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default FAB;
