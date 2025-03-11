var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/components/buttons/Button/index.tsx
import { Icon } from "@iconify/react";
import clsx from "clsx";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

// src/components/buttons/Button/buttonUtils.ts
var generateBaseClass = (hasChildren, iconAtEnd) => `flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg p-4 ${hasChildren && (iconAtEnd ? "pl-5" : "pr-5")} font-medium tracking-wide transition-all disabled:cursor-not-allowed`;
var generateColorClass = (isRed, variant) => {
  if (isRed) {
    return variant !== "no-bg" ? "bg-red-500 hover:bg-red-600 text-bg-50 dark:text-bg-800" : "text-red-500 hover:text-red-600 hover:bg-red-500/10";
  }
  switch (variant) {
    case "primary":
      return "bg-custom-500 shadow-custom hover:bg-custom-600 text-bg-50 dark:text-bg-800 disabled:bg-bg-500 disabled:hover:bg-bg-500";
    case "no-bg":
      return "hover:bg-bg-200/50 dark:hover:bg-bg-800/50 text-bg-500 hover:text-bg-800 dark:hover:text-bg-50! disabled:hover:text-bg-500 disabled:dark:hover:text-bg-500 disabled:dark:hover:bg-transparent disabled:text-bg-500";
    case "secondary":
    default:
      return "bg-bg-300 shadow-custom text-bg-500 dark:text-bg-800 dark:bg-bg-600 hover:bg-bg-400/50 dark:hover:bg-bg-500/80";
  }
};
var generateClassName = (hasChildren, iconAtEnd, isRed, variant, className) => `${generateBaseClass(hasChildren, iconAtEnd)} ${generateColorClass(
  isRed,
  variant
)} ${className}`;

// src/components/buttons/Button/index.tsx
import _ from "lodash";
import { jsx, jsxs } from "react/jsx-runtime";
var defaultProps = {
  iconAtEnd: false,
  loading: false,
  disabled: false,
  className: "",
  variant: "primary",
  isRed: false,
  namespace: "common.buttons"
};
var renderIcon = (icon, loading, iconClassName) => /* @__PURE__ */ jsx(
  Icon,
  {
    className: clsx("size-5 shrink-0", iconClassName),
    icon: loading ? "svg-spinners:180-ring" : icon
  }
);
function Button(_a) {
  var _b = _a, {
    as,
    children,
    icon,
    onClick
  } = _b, props = __objRest(_b, [
    "as",
    "children",
    "icon",
    "onClick"
  ]);
  const Component = as || "button";
  const finalProps = React.useMemo(
    () => __spreadValues(__spreadValues({}, defaultProps), props),
    [props]
  );
  const finalClassName = generateClassName(
    Boolean(children),
    finalProps.iconAtEnd,
    finalProps.isRed,
    finalProps.variant,
    finalProps.className
  );
  const { t } = useTranslation(finalProps.namespace);
  const memoizedOnClick = React.useCallback(
    (e) => {
      if (onClick) onClick(e);
    },
    [onClick]
  );
  return /* @__PURE__ */ jsxs(
    Component,
    __spreadProps(__spreadValues({}, props), {
      className: finalClassName,
      disabled: finalProps.loading || finalProps.disabled,
      type: "button",
      onClick: memoizedOnClick,
      children: [
        !finalProps.iconAtEnd && renderIcon(icon, finalProps.loading, finalProps.iconClassName),
        children && typeof children === "string" ? t(
          [
            `common.buttons:${_.camelCase(children)}`,
            `buttons.${_.camelCase(children)}`,
            `${finalProps.tKey}.buttons.${_.camelCase(children)}`,
            children
          ],
          finalProps.tProps
        ) : children,
        finalProps.iconAtEnd && renderIcon(icon, finalProps.loading, finalProps.iconClassName)
      ]
    })
  );
}
var Button_default = memo(Button);

// src/components/buttons/Switch.tsx
import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx2 from "clsx";

// src/hooks/useThemeColor.ts
import { useMemo } from "react";

// src/constants/theme_color_hex.ts
var THEME_COLOR_HEX = {
  red: "rgb(244, 67, 54)",
  pink: "rgb(233, 30, 99)",
  purple: "rgb(156, 39, 176)",
  deepPurple: "rgb(103, 58, 183)",
  indigo: "rgb(63, 81, 181)",
  blue: "rgb(33, 150, 243)",
  lightBlue: "rgb(3, 169, 244)",
  cyan: "rgb(0, 188, 212)",
  teal: "rgb(0, 150, 136)",
  green: "rgb(76, 175, 80)",
  lightGreen: "rgb(139, 195, 74)",
  lime: "rgb(205, 220, 57)",
  yellow: "rgb(255, 235, 59)",
  amber: "rgb(255, 193, 7)",
  orange: "rgb(255, 152, 0)",
  deepOrange: "rgb(255, 87, 34)",
  brown: "rgb(121, 85, 72)",
  grey: "rgb(158, 158, 158)"
};
var theme_color_hex_default = THEME_COLOR_HEX;

// src/utils/colors.ts
import Gradient from "javascript-color-gradient";
function isLightColor(color) {
  let r = 0;
  let g = 0;
  let b = 0;
  if (color.startsWith("#")) {
    r = parseInt(color.substr(1, 2), 16);
    g = parseInt(color.substr(3, 2), 16);
    b = parseInt(color.substr(5, 2), 16);
  }
  if (color.startsWith("rgb")) {
    const match = color.match(/(\d+)/g);
    r = parseInt(match[0]);
    g = parseInt(match[1]);
    b = parseInt(match[2]);
  }
  const brightness = (r * 299 + g * 587 + b * 114) / 1e3;
  return brightness > 155;
}
function hexToRgb(hex) {
  return hex.replace(
    /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    (_20, r, g, b) => "#" + r + r + g + g + b + b
  ).substring(1).match(/.{2}/g).map((x) => parseInt(x, 16));
}
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  let s;
  const l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if (h !== void 0) h /= 6;
  }
  return [h != null ? h : 0, s, l];
}
function hslToRgb(h, s, l) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    let hue2rgb2 = function(p2, q2, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    var hue2rgb = hue2rgb2;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb2(p, q, h + 1 / 3);
    g = hue2rgb2(p, q, h);
    b = hue2rgb2(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
}
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => {
    const hex = Math.floor(x).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}
var multiplyMatrices = (A, B) => {
  return [
    A[0] * B[0] + A[1] * B[1] + A[2] * B[2],
    A[3] * B[0] + A[4] * B[1] + A[5] * B[2],
    A[6] * B[0] + A[7] * B[1] + A[8] * B[2]
  ];
};
var oklch2oklab = ([l, c, h]) => [
  l,
  isNaN(h) ? 0 : c * Math.cos(h * Math.PI / 180),
  isNaN(h) ? 0 : c * Math.sin(h * Math.PI / 180)
];
var srgbLinear2rgb = (rgb) => rgb.map(
  (c) => Math.abs(c) > 31308e-7 ? (c < 0 ? -1 : 1) * (1.055 * Math.abs(c) ** (1 / 2.4) - 0.055) : 12.92 * c
);
var oklab2xyz = (lab) => {
  const LMSg = multiplyMatrices(
    [
      1,
      0.3963377773761749,
      0.2158037573099136,
      1,
      -0.1055613458156586,
      -0.0638541728258133,
      1,
      -0.0894841775298119,
      -1.2914855480194092
    ],
    lab
  );
  const LMS = LMSg.map((val) => val ** 3);
  return multiplyMatrices(
    [
      1.2268798758459243,
      -0.5578149944602171,
      0.2813910456659647,
      -0.0405757452148008,
      1.112286803280317,
      -0.0717110580655164,
      -0.0763729366746601,
      -0.4214933324022432,
      1.5869240198367816
    ],
    LMS
  );
};
var xyz2rgbLinear = (xyz) => {
  return multiplyMatrices(
    [
      3.2409699419045226,
      -1.537383177570094,
      -0.4986107602930034,
      -0.9692436362808796,
      1.8759675015077202,
      0.04155505740717559,
      0.05563007969699366,
      -0.20397695888897652,
      1.0569715142428786
    ],
    xyz
  );
};
var oklch2rgb = (lch) => srgbLinear2rgb(xyz2rgbLinear(oklab2xyz(oklch2oklab(lch))));
function oklchToHex(oklch) {
  const numbersInParentheses = oklch.match(/\(([^)]+)\)/)[1];
  const [l, c, h] = numbersInParentheses.split(" ").map((x) => parseFloat(x));
  const rgb = oklch2rgb([l, c, h]).map((x) => Math.max(0, Math.min(1, x)));
  return rgbToHex(
    Math.round(rgb[0] * 255),
    Math.round(rgb[1] * 255),
    Math.round(rgb[2] * 255)
  );
}
function getColorPalette(color, type, theme) {
  let finalColor = color;
  if (type === "bg") {
    const [r, g, b] = hexToRgb(color);
    let [h, s, l] = rgbToHsl(r, g, b);
    l = theme === "dark" ? 0.4 : 0.7;
    const [r2, g2, b2] = hslToRgb(h, s, l);
    finalColor = rgbToHex(r2, g2, b2);
  }
  const gradientArray = new Gradient().setColorGradient("#FFFFFF", finalColor, "#000000").setMidpoint(14).getColors().slice(1, -1);
  const number = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return number.reduce((acc, cur, idx) => {
    acc[cur] = gradientArray[idx];
    return acc;
  }, {});
}

// src/hooks/useThemeColor.ts
import _2 from "lodash";

// src/providers/LifeforgeUIProvider.tsx
import { useContext, createContext } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var LifeforgeUIContext = createContext(void 0);
var LifeforgeUIProvider = ({
  children,
  personalization
}) => {
  return /* @__PURE__ */ jsx2(
    LifeforgeUIContext.Provider,
    {
      value: personalization || {
        apiHost: "",
        googleAPIKey: "",
        theme: "dark",
        themeColor: "lime",
        bgTemp: "zinc",
        bgImage: "",
        setTheme: () => {
        },
        setThemeColor: () => {
        },
        setBgTemp: () => {
        },
        setBgImage: () => {
        },
        language: "en"
      },
      children
    }
  );
};
var useLifeforgeUIContext = () => {
  const context = useContext(LifeforgeUIContext);
  if (context === void 0) {
    throw new Error(
      "useLifeforgeUIContext must be used within a LifeforgeUIProvider"
    );
  }
  return context;
};

// src/hooks/useThemeColor.ts
var bgTheme = {
  slate: {
    50: "rgb(248, 250, 252)",
    100: "rgb(241, 245, 249)",
    200: "rgb(226, 232, 240)",
    300: "rgb(203, 213, 225)",
    400: "rgb(148, 163, 184)",
    500: "rgb(100, 116, 139)",
    600: "rgb(71, 85, 105)",
    700: "rgb(51, 65, 85)",
    800: "rgb(30, 41, 59)",
    900: "rgb(15, 23, 42)",
    950: "rgb(2, 6, 23)"
  },
  gray: {
    50: "rgb(249, 250, 251)",
    100: "rgb(243, 244, 246)",
    200: "rgb(229, 231, 235)",
    300: "rgb(209, 213, 219)",
    400: "rgb(156, 163, 175)",
    500: "rgb(107, 114, 128)",
    600: "rgb(75, 85, 99)",
    700: "rgb(55, 65, 81)",
    800: "rgb(31, 41, 55)",
    900: "rgb(17, 24, 39)",
    950: "rgb(3, 7, 18)"
  },
  zinc: {
    50: "rgb(250, 250, 250)",
    100: "rgb(244, 244, 245)",
    200: "rgb(228, 228, 231)",
    300: "rgb(212, 212, 216)",
    400: "rgb(161, 161, 170)",
    500: "rgb(113, 113, 122)",
    600: "rgb(82, 82, 91)",
    700: "rgb(63, 63, 70)",
    800: "rgb(39, 39, 42)",
    900: "rgb(24, 24, 27)",
    950: "rgb(9, 9, 11)"
  },
  neutral: {
    50: "rgb(250, 250, 250)",
    100: "rgb(245, 245, 245)",
    200: "rgb(229, 229, 229)",
    300: "rgb(212, 212, 212)",
    400: "rgb(163, 163, 163)",
    500: "rgb(115, 115, 115)",
    600: "rgb(82, 82, 82)",
    700: "rgb(64, 64, 64)",
    800: "rgb(38, 38, 38)",
    900: "rgb(23, 23, 23)",
    950: "rgb(10, 10, 10)"
  },
  stone: {
    50: "rgb(250, 250, 249)",
    100: "rgb(245, 245, 244)",
    200: "rgb(231, 229, 228)",
    300: "rgb(214, 211, 209)",
    400: "rgb(168, 162, 158)",
    500: "rgb(120, 113, 108)",
    600: "rgb(87, 83, 78)",
    700: "rgb(68, 64, 60)",
    800: "rgb(41, 37, 36)",
    900: "rgb(28, 25, 23)",
    950: "rgb(12, 10, 9)"
  }
};
function useThemeColors() {
  const { theme, bgImage, themeColor, bgTemp } = useLifeforgeUIContext();
  const finalTheme = useMemo(() => {
    return !themeColor.startsWith("#") ? theme_color_hex_default[_2.camelCase(
      themeColor.replace("theme-", "").replace(/-/g, " ")
    )] : themeColor;
  }, [themeColor]);
  const finalBgTemp = useMemo(() => {
    return !bgTemp.startsWith("#") ? bgTheme[bgTemp.replace("bg-", "")] : getColorPalette(
      bgTemp,
      "bg",
      (() => {
        if (theme === "system") {
          return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return theme;
      })()
    );
  }, [bgTemp]);
  const componentBg = useMemo(() => {
    if (bgImage !== "") return "bg-bg-50/50 backdrop-blur-xs dark:bg-bg-900/50";
    return "bg-bg-50 dark:bg-bg-900";
  }, [bgImage]);
  const componentBgWithHover = useMemo(() => {
    if (bgImage !== "") {
      return "bg-bg-50/50 backdrop-blur-xs dark:bg-bg-900/50 hover:bg-bg-100/50 dark:hover:bg-bg-800/50 transition-all";
    }
    return "bg-bg-50 dark:bg-bg-900 dark:hover:bg-bg-800/70 hover:bg-bg-100 transition-all";
  }, [bgImage]);
  const componentBgLighter = useMemo(() => {
    if (bgImage !== "") return "bg-bg-100/50 dark:bg-bg-800/50";
    return "bg-bg-100 dark:bg-bg-800/50";
  }, [bgImage]);
  const componentBgLighterWithHover = useMemo(() => {
    if (bgImage !== "") {
      return "bg-bg-100/50 dark:bg-bg-800/50 hover:bg-bg-200/50 dark:hover:bg-bg-700/50 transition-all";
    }
    return "bg-bg-100/50 dark:bg-bg-800/50 dark:hover:bg-bg-800/80 hover:bg-bg-200/50 transition-all";
  }, [bgImage]);
  const darkerComponentBgWithHover = useMemo(() => {
    if (bgImage !== "") {
      return "bg-bg-50/50 backdrop-blur-xs dark:bg-bg-800/50 hover:bg-bg-200/50 dark:hover:bg-bg-700/50 transition-all";
    }
    return "bg-bg-200/50 dark:bg-bg-800/50 dark:hover:bg-bg-800/80 hover:bg-bg-200 transition-all";
  }, [bgImage]);
  return {
    theme: finalTheme,
    bgTemp: finalBgTemp,
    componentBg,
    componentBgWithHover,
    componentBgLighter,
    componentBgLighterWithHover,
    darkerComponentBgWithHover
  };
}

// src/components/buttons/Switch.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function Switch({
  checked,
  onChange
}) {
  const { darkerComponentBgWithHover, theme } = useThemeColors();
  const getStateClassName = () => {
    if (checked) {
      return clsx2(
        isLightColor(theme) ? "bg-bg-100 dark:bg-bg-800" : "bg-bg-100",
        "translate-x-6"
      );
    }
    return "translate-x-1 bg-bg-50 dark:bg-bg-500";
  };
  return /* @__PURE__ */ jsx3(
    HeadlessSwitch,
    {
      checked,
      className: clsx2(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full",
        checked ? "bg-custom-500" : darkerComponentBgWithHover
      ),
      onChange,
      children: /* @__PURE__ */ jsx3(
        "span",
        {
          className: clsx2(
            "inline-block size-4 shrink-0 rounded-full transition",
            getStateClassName()
          )
        }
      )
    }
  );
}
var Switch_default = Switch;

// src/components/buttons/Checkbox.tsx
import { Icon as Icon2 } from "@iconify/react";
import clsx3 from "clsx";
import { jsx as jsx4 } from "react/jsx-runtime";
function Checkbox({
  checked,
  onChange,
  className
}) {
  return /* @__PURE__ */ jsx4(
    "button",
    {
      className: clsx3(
        "flex-center group ring-offset-bg-50 dark:ring-offset-bg-900 relative z-50 size-5 shrink-0 cursor-pointer rounded-full ring-2 ring-offset-2 transition-all",
        checked ? "ring-custom-500" : "ring-bg-200 hover:ring-bg-600! dark:ring-bg-500 dark:hover:ring-bg-300!",
        className
      ),
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(e);
      },
      children: /* @__PURE__ */ jsx4(
        Icon2,
        {
          className: clsx3(
            "size-4 stroke-1",
            checked ? "stroke-custom-500 text-custom-500" : "stroke-bg-800 text-bg-800 dark:stroke-bg-100 dark:text-bg-100 opacity-0 group-hover:opacity-50"
          ),
          icon: "uil:check"
        }
      )
    }
  );
}
var Checkbox_default = Checkbox;

// src/components/buttons/FAB.tsx
import clsx4 from "clsx";
import { jsx as jsx5 } from "react/jsx-runtime";
function FAB({
  onClick,
  icon = "tabler:plus",
  text = "",
  hideWhen = "sm",
  alwaysShow = false,
  as,
  isRed,
  loading
}) {
  return /* @__PURE__ */ jsx5(
    Button_default,
    {
      as: as != null ? as : "button",
      className: clsx4(
        "fixed right-6 bottom-6 z-10 shadow-lg",
        !alwaysShow && {
          sm: "sm:hidden",
          md: "md:hidden",
          lg: "lg:hidden",
          xl: "xl:hidden"
        }[hideWhen]
      ),
      icon,
      isRed,
      loading,
      onClick,
      children: text
    }
  );
}
var FAB_default = FAB;

// src/components/buttons/GoBackButton.tsx
import { useTranslation as useTranslation2 } from "react-i18next";
import { jsx as jsx6 } from "react/jsx-runtime";
function GoBackButton({
  onClick
}) {
  const { t } = useTranslation2("common.misc");
  return /* @__PURE__ */ jsx6(
    Button_default,
    {
      className: "mb-2 w-min px-0 py-2 pl-2 hover:bg-transparent! dark:hover:bg-transparent!",
      icon: "tabler:chevron-left",
      variant: "no-bg",
      onClick,
      children: t("buttons.goBack")
    }
  );
}
var GoBackButton_default = GoBackButton;

// src/components/buttons/CreateOrModifyButton.tsx
import clsx5 from "clsx";
import { jsx as jsx7 } from "react/jsx-runtime";
function CreateOrModifyButton({
  type,
  loading,
  onClick,
  disabled,
  className
}) {
  return /* @__PURE__ */ jsx7(
    Button_default,
    {
      className: clsx5("mt-6", className),
      disabled,
      icon: !loading && type !== null ? {
        create: "tabler:plus",
        update: "tabler:pencil",
        rename: "tabler:pencil"
      }[type] : "svg-spinners:180-ring",
      loading,
      onClick,
      children: !loading && type !== null && type
    }
  );
}
var CreateOrModifyButton_default = CreateOrModifyButton;

// src/components/buttons/HamburgerMenu/index.tsx
import {
  Menu,
  MenuButton,
  MenuItems,
  Transition,
  TransitionChild
} from "@headlessui/react";
import { Icon as Icon3 } from "@iconify/react";
import clsx6 from "clsx";
import { useState } from "react";
import { jsx as jsx8, jsxs as jsxs2 } from "react/jsx-runtime";
function getPaddingClass(largerPadding, smallerPadding) {
  if (largerPadding === true) {
    return "p-4";
  } else if (smallerPadding === true) {
    return "p-1";
  } else {
    return "p-2";
  }
}
function getColorClass(lighter) {
  if (lighter === true) {
    return "text-bg-50 hover:bg-bg-700/50";
  } else {
    return "text-bg-500 hover:bg-bg-200/50 hover:text-bg-800 dark:hover:text-bg-50 dark:hover:bg-bg-700/30";
  }
}
function HamburgerMenu(props) {
  var _a;
  const {
    children,
    className,
    customTailwindColor,
    style = {},
    customHoverColor,
    lighter,
    largerPadding,
    largerIcon,
    smallerPadding,
    customWidth,
    customIcon,
    onButtonClick,
    onClose
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs2(Menu, { as: "div", className, children: [
    /* @__PURE__ */ jsx8(
      MenuButton,
      {
        className: clsx6(
          "rounded-md transition-all",
          getPaddingClass(largerPadding, smallerPadding),
          (_a = style.color === void 0 && customTailwindColor) != null ? _a : getColorClass(lighter)
        ),
        style,
        onClick: (e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
          if (onButtonClick !== void 0) {
            onButtonClick(e);
          }
        },
        onMouseEnter: (e) => {
          if (customHoverColor !== void 0) {
            e.currentTarget.style.backgroundColor = customHoverColor;
          }
        },
        onMouseLeave: (e) => {
          if (customHoverColor !== void 0) {
            e.currentTarget.style.backgroundColor = "";
          }
        },
        children: /* @__PURE__ */ jsx8(
          Icon3,
          {
            className: largerIcon === true ? "size-6" : "size-5",
            icon: customIcon != null ? customIcon : "tabler:dots-vertical"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx8(
      Transition,
      {
        afterLeave: () => {
          if (onClose !== void 0) {
            onClose();
          }
        },
        enter: "transition-opacity duration-200",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "transition-opacity duration-150",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsx8(TransitionChild, { children: /* @__PURE__ */ jsx8(
          MenuItems,
          {
            transition: true,
            anchor: "bottom end",
            className: clsx6(
              customWidth,
              "border-bg-200 bg-bg-100 dark:border-bg-700 dark:bg-bg-800 z-9991 mt-2 overflow-hidden overscroll-contain rounded-md border shadow-lg outline-hidden transition duration-100 ease-out focus:outline-hidden data-closed:scale-95 data-closed:opacity-0"
            ),
            children
          }
        ) })
      }
    )
  ] });
}
var HamburgerMenu_default = HamburgerMenu;

// src/components/buttons/HamburgerMenu/components/HamburgerSelectorWrapper.tsx
import { Icon as Icon4 } from "@iconify/react";
import { jsx as jsx9, jsxs as jsxs3 } from "react/jsx-runtime";
function HamburgerSelectorWrapper({
  icon,
  title,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs3("div", { className, children: [
    /* @__PURE__ */ jsxs3("span", { className: "text-bg-500 flex items-center gap-4 p-4", children: [
      /* @__PURE__ */ jsx9(Icon4, { className: "size-5", icon }),
      title
    ] }),
    /* @__PURE__ */ jsx9("div", { className: "p-4 pt-0", children: /* @__PURE__ */ jsx9("ul", { className: "divide-bg-200 dark:divide-bg-700 bg-bg-200/50 shadow-custom dark:bg-bg-700/50 flex flex-col divide-y overflow-hidden rounded-md", children }) })
  ] });
}
var HamburgerSelectorWrapper_default = HamburgerSelectorWrapper;

// src/components/buttons/HamburgerMenu/components/MenuItem.tsx
import { MenuItem as HeadlessMenuItem } from "@headlessui/react";
import { Icon as Icon5 } from "@iconify/react";
import clsx7 from "clsx";
import { useTranslation as useTranslation3 } from "react-i18next";
import _3 from "lodash";
import { jsx as jsx10, jsxs as jsxs4 } from "react/jsx-runtime";
function getActiveClass(active, isRed) {
  if (active === true) {
    return `bg-bg-200/50! ${isRed === true ? "text-red-600" : "text-bg-800 dark:text-bg-50"} dark:bg-bg-700/50!`;
  } else {
    return isRed === true ? "text-red-500" : "text-bg-500";
  }
}
function getToggleIconClass(isRed) {
  return isRed === true ? "text-red-600" : "text-bg-500";
}
function MenuItem({
  icon,
  text,
  isRed = false,
  onClick,
  isToggled,
  disabled,
  preventDefault = false,
  namespace = "common.buttons",
  loading = false
}) {
  const { t } = useTranslation3(namespace ? namespace : "common.buttons");
  return /* @__PURE__ */ jsx10(HeadlessMenuItem, { children: function({ active, close }) {
    return /* @__PURE__ */ jsxs4(
      "button",
      {
        className: clsx7(
          !disabled && !loading ? getActiveClass(active, isRed) : "text-bg-500",
          "flex w-full items-center gap-4 p-4 text-left transition-all"
        ),
        disabled: disabled || loading,
        onClick: (e) => {
          if (preventDefault) {
            e.preventDefault();
          }
          e.stopPropagation();
          onClick(e, close);
        },
        children: [
          loading ? /* @__PURE__ */ jsx10(Icon5, { className: "size-5 shrink-0", icon: "svg-spinners:180-ring" }) : typeof icon === "string" ? /* @__PURE__ */ jsx10(Icon5, { className: "size-5 shrink-0", icon }) : icon,
          /* @__PURE__ */ jsx10("span", { className: "w-full truncate whitespace-nowrap", children: namespace !== false ? t([_3.camelCase(text), `buttons.${_3.camelCase(text)}`]) : text }),
          isToggled && /* @__PURE__ */ jsx10(
            Icon5,
            {
              className: clsx7(
                getToggleIconClass(isRed),
                "ml-4 size-5 shrink-0"
              ),
              icon: "tabler:check"
            }
          )
        ]
      }
    );
  } });
}
var MenuItem_default = MenuItem;

// src/components/inputs/TextInput/index.tsx
import { memo as memo3, useEffect, useRef as useRef2, useState as useState2 } from "react";
import { useTranslation as useTranslation4 } from "react-i18next";

// src/components/inputs/shared/InputActionButton.tsx
import { Icon as Icon6 } from "@iconify/react";
import { jsx as jsx11 } from "react/jsx-runtime";
function InputActionButton({
  actionButtonLoading,
  onActionButtonClick,
  actionButtonIcon
}) {
  return /* @__PURE__ */ jsx11(
    "button",
    {
      className: "text-bg-500 hover:bg-bg-300 hover:text-bg-800 dark:hover:bg-bg-700/70 dark:hover:text-bg-200 mr-4 shrink-0 rounded-lg p-2 transition-all focus:outline-hidden",
      disabled: actionButtonLoading,
      tabIndex: -1,
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        onActionButtonClick(e);
      },
      children: /* @__PURE__ */ jsx11(
        Icon6,
        {
          className: "size-6",
          icon: actionButtonLoading ? "svg-spinners:180-ring" : actionButtonIcon
        }
      )
    }
  );
}
var InputActionButton_default = InputActionButton;

// src/components/inputs/shared/InputBox.tsx
import clsx8 from "clsx";
import { useRef } from "react";
import { Fragment, jsx as jsx12, jsxs as jsxs5 } from "react/jsx-runtime";
function InputBox({
  value,
  setValue,
  isPassword = false,
  inputMode,
  showPassword,
  placeholder,
  inputRef,
  reference,
  disabled = false,
  noAutoComplete = false,
  onKeyDown = () => {
  },
  className = "",
  onBlur = () => {
  }
}) {
  const innerRef = useRef(null);
  return /* @__PURE__ */ jsxs5(Fragment, { children: [
    isPassword && /* @__PURE__ */ jsx12("input", { hidden: true, type: "password", value: "", onChange: () => {
    } }),
    /* @__PURE__ */ jsx12(
      "input",
      {
        ref: (ref) => {
          if (reference !== void 0) {
            reference.current = ref;
          }
          if (inputRef !== void 0) {
            inputRef.current = ref;
          }
          innerRef.current = ref;
        },
        autoComplete: noAutoComplete ? "false" : "true",
        className: clsx8(
          "caret-custom-500 focus:placeholder:text-bg-500 mt-6 h-8 w-full rounded-lg bg-transparent p-6 pl-4 tracking-wider placeholder:text-transparent focus:outline-hidden",
          className
        ),
        disabled,
        inputMode,
        placeholder,
        style: isPassword && showPassword !== true ? { fontFamily: "Arial" } : {},
        type: isPassword && showPassword !== true ? "password" : "text",
        value,
        onBlur: (e) => {
          setValue(e.target.value.trim());
          onBlur();
        },
        onChange: (e) => {
          setValue(e.target.value);
        },
        onKeyDown
      }
    )
  ] });
}
var InputBox_default = InputBox;

// src/components/inputs/shared/InputIcon.tsx
import { Icon as Icon7 } from "@iconify/react";
import clsx9 from "clsx";
import { memo as memo2 } from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
function InputIcon({
  icon,
  active,
  listboxOrCombobox,
  className
}) {
  return /* @__PURE__ */ jsx13(
    Icon7,
    {
      className: clsx9(
        "group-focus-within:text-custom-500! size-6 shrink-0 transition-all",
        !active && "text-bg-500",
        listboxOrCombobox !== void 0 && "group-data-open:text-custom-500!",
        className
      ),
      icon
    }
  );
}
var InputIcon_default = memo2(InputIcon);

// src/components/inputs/shared/InputLabel.tsx
import clsx10 from "clsx";
import { useMemo as useMemo2 } from "react";
import { jsx as jsx14, jsxs as jsxs6 } from "react/jsx-runtime";
var InputLabel = ({
  label,
  active,
  isListboxOrCombobox = false,
  isCombobox = false,
  required = false
}) => {
  const labelPositionClasses = useMemo2(() => {
    if (!active) {
      return `top-1/2 -translate-y-1/2 ${isListboxOrCombobox ? `${isCombobox && "group-focus-within:top-5 group-focus-within:text-[14px]"} group-data-open:top-5 group-data-open:text-[14px]` : "group-focus-within:top-5 group-focus-within:text-[14px]"}`;
    }
    return "top-5 -translate-y-1/2 text-[14px]";
  }, [active, isListboxOrCombobox, isCombobox]);
  const labelColorClasses = useMemo2(
    () => isListboxOrCombobox ? `${isCombobox && "group-focus-within:text-custom-500!"} group-data-open:text-custom-500!` : "group-focus-within:text-custom-500!",
    [isListboxOrCombobox]
  );
  return /* @__PURE__ */ jsxs6(
    "span",
    {
      className: clsx10(
        "text-bg-500 pointer-events-none absolute left-[4.2rem] font-medium tracking-wide transition-all",
        labelColorClasses,
        labelPositionClasses
      ),
      children: [
        label,
        required && /* @__PURE__ */ jsx14("span", { className: "text-red-500", children: " *" })
      ]
    }
  );
};
var InputLabel_default = InputLabel;

// src/components/inputs/shared/InputWrapper.tsx
import clsx11 from "clsx";
import { jsx as jsx15 } from "react/jsx-runtime";
function InputWrapper({
  darker = false,
  className = "",
  disabled = false,
  inputRef,
  children
}) {
  const { componentBgWithHover, componentBgLighterWithHover } = useThemeColors();
  function focusInput(e) {
    if (e.target.tagName === "BUTTON") {
      return;
    }
    if ((inputRef == null ? void 0 : inputRef.current) !== void 0 && inputRef.current !== null) {
      inputRef.current.focus();
      if (e.target.tagName !== "INPUT") {
        inputRef.current.setSelectionRange(
          inputRef.current.value.length,
          inputRef.current.value.length
        );
      }
    }
  }
  return /* @__PURE__ */ jsx15(
    "div",
    {
      className: clsx11(
        "group border-bg-500 bg-bg-200/50 shadow-custom focus-within:!border-custom-500 hover:bg-bg-200 relative flex shrink-0 items-center gap-1 rounded-t-lg border-b-2 pl-6 transition-all",
        darker ? componentBgLighterWithHover : componentBgWithHover,
        className,
        disabled ? "pointer-events-none! opacity-50" : "cursor-text"
      ),
      role: "button",
      tabIndex: 0,
      onClick: focusInput,
      onFocus: focusInput,
      onKeyDown: (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          if ((inputRef == null ? void 0 : inputRef.current) !== void 0 && inputRef.current !== null) {
            inputRef.current.focus();
          }
        }
      },
      children
    }
  );
}
var InputWrapper_default = InputWrapper;

// src/components/inputs/TextInput/index.tsx
import _4 from "lodash";
import { jsx as jsx16, jsxs as jsxs7 } from "react/jsx-runtime";
function TextInput({
  actionButtonIcon = "",
  actionButtonLoading = false,
  autoFocus = false,
  className = "",
  darker = false,
  disabled = false,
  icon,
  inputMode = "text",
  isPassword = false,
  name,
  noAutoComplete = true,
  onActionButtonClick = () => {
  },
  onKeyDown = () => {
  },
  placeholder,
  ref,
  required,
  setValue,
  value,
  namespace,
  tKey
}) {
  const { t } = useTranslation4(namespace ? namespace : void 0);
  const [showPassword, setShowPassword] = useState2(false);
  const inputRef = useRef2(null);
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  return /* @__PURE__ */ jsxs7(
    InputWrapper_default,
    {
      className,
      darker,
      disabled,
      inputRef,
      children: [
        /* @__PURE__ */ jsx16(InputIcon_default, { active: String(value).length > 0, icon }),
        /* @__PURE__ */ jsxs7("div", { className: "flex w-full items-center gap-2", children: [
          /* @__PURE__ */ jsx16(
            InputLabel_default,
            {
              active: String(value).length > 0,
              label: namespace !== false ? t([
                [tKey, "inputs", _4.camelCase(name), "label"].filter((e) => e).join("."),
                [tKey, "inputs", _4.camelCase(name)].filter((e) => e).join(".")
              ]) : name,
              required: required === true
            }
          ),
          /* @__PURE__ */ jsx16(
            InputBox_default,
            {
              disabled,
              inputMode,
              inputRef,
              isPassword,
              noAutoComplete,
              placeholder,
              reference: ref,
              setValue,
              showPassword,
              value,
              onKeyDown
            }
          ),
          isPassword && /* @__PURE__ */ jsx16(
            Button_default,
            {
              className: "mr-2",
              icon: showPassword ? "tabler:eye" : "tabler:eye-off",
              variant: "no-bg",
              onMouseDown: () => {
                setShowPassword(true);
              },
              onMouseUp: () => {
                setShowPassword(false);
              },
              onTouchEnd: () => {
                setShowPassword(false);
              },
              onTouchStart: () => {
                setShowPassword(true);
              }
            }
          ),
          actionButtonIcon && /* @__PURE__ */ jsx16(
            InputActionButton_default,
            {
              actionButtonIcon,
              actionButtonLoading,
              onActionButtonClick
            }
          )
        ] })
      ]
    }
  );
}
var TextInput_default = memo3(TextInput);

// src/components/inputs/IconInput/index.tsx
import { Icon as Icon8 } from "@iconify/react";
import clsx12 from "clsx";
import { useRef as useRef3 } from "react";
import { useTranslation as useTranslation5 } from "react-i18next";
import _5 from "lodash";
import { Fragment as Fragment2, jsx as jsx17, jsxs as jsxs8 } from "react/jsx-runtime";
function IconInput({
  name,
  icon,
  setIcon,
  setIconSelectorOpen,
  namespace
}) {
  const { t } = useTranslation5(namespace);
  const ref = useRef3(null);
  function updateIcon(e) {
    setIcon(e.target.value);
  }
  return /* @__PURE__ */ jsx17(Fragment2, { children: /* @__PURE__ */ jsxs8(InputWrapper_default, { darker: true, className: "mt-4", inputRef: ref, children: [
    /* @__PURE__ */ jsx17(InputIcon_default, { active: !!icon, icon: "tabler:icons" }),
    /* @__PURE__ */ jsxs8("div", { className: "flex w-full items-center gap-2", children: [
      /* @__PURE__ */ jsx17(
        "span",
        {
          className: clsx12(
            "text-bg-500 group-focus-within:!text-custom-500 pointer-events-none absolute left-[4.2rem] font-medium tracking-wide transition-all",
            icon.length === 0 ? "top-1/2 -translate-y-1/2 group-focus-within:top-6 group-focus-within:text-[14px]" : "top-6 -translate-y-1/2 text-[14px]"
          ),
          children: t(`inputs.${_5.camelCase(name)}`)
        }
      ),
      /* @__PURE__ */ jsxs8("div", { className: "mt-6 mr-12 flex w-full items-center gap-2 pl-4", children: [
        /* @__PURE__ */ jsx17(
          Icon8,
          {
            className: clsx12(
              "size-4 shrink-0",
              !icon && "pointer-events-none opacity-0 group-focus-within:opacity-100"
            ),
            icon: icon || "tabler:question-mark"
          }
        ),
        /* @__PURE__ */ jsx17(
          "input",
          {
            ref,
            className: "focus:placeholder:text-bg-500 h-8 w-full rounded-lg bg-transparent p-6 pl-0 tracking-wide placeholder:text-transparent focus:outline-hidden",
            placeholder: "tabler:cube",
            value: icon,
            onChange: updateIcon
          }
        )
      ] }),
      /* @__PURE__ */ jsx17(
        "button",
        {
          className: "text-bg-500 hover:bg-bg-300 hover:text-bg-800 dark:hover:bg-bg-700/70 dark:hover:text-bg-200 mr-4 shrink-0 rounded-lg p-2 transition-all focus:outline-hidden",
          onClick: () => {
            setIconSelectorOpen(true);
          },
          children: /* @__PURE__ */ jsx17(Icon8, { className: "size-5", icon: "tabler:chevron-down" })
        }
      )
    ] })
  ] }) });
}
var IconInput_default = IconInput;

// src/components/inputs/ColorInput/index.tsx
import { Icon as Icon9 } from "@iconify/react";
import clsx13 from "clsx";
import { useCallback, useRef as useRef4 } from "react";
import { useTranslation as useTranslation6 } from "react-i18next";
import _6 from "lodash";
import { jsx as jsx18, jsxs as jsxs9 } from "react/jsx-runtime";
function ColorInput({
  name,
  color,
  setColor: updateColor,
  setColorPickerOpen,
  hasTopMargin = true,
  className,
  namespace
}) {
  const { t } = useTranslation6(namespace);
  const ref = useRef4(null);
  const handleColorPickerOpen = useCallback(() => {
    setColorPickerOpen(true);
  }, [setColorPickerOpen]);
  return /* @__PURE__ */ jsxs9(
    InputWrapper_default,
    {
      darker: true,
      className: clsx13(hasTopMargin && "mt-4", className),
      inputRef: ref,
      children: [
        /* @__PURE__ */ jsx18(InputIcon_default, { active: color !== "", icon: "tabler:palette" }),
        /* @__PURE__ */ jsxs9("div", { className: "flex w-full items-center gap-2", children: [
          /* @__PURE__ */ jsx18(
            "span",
            {
              className: clsx13(
                "text-bg-500 group-focus-within:!text-custom-500 pointer-events-none absolute left-[4.2rem] font-medium tracking-wide",
                color.length === 0 ? "top-1/2 -translate-y-1/2 group-focus-within:top-6 group-focus-within:text-[14px]" : "top-6 -translate-y-1/2 text-[14px]"
              ),
              children: t(`inputs.${_6.camelCase(name)}`)
            }
          ),
          /* @__PURE__ */ jsxs9("div", { className: "mt-6 mr-4 flex w-full items-center gap-2 pl-4", children: [
            /* @__PURE__ */ jsx18(
              "div",
              {
                className: "mt-0.5 size-3 shrink-0 rounded-full",
                style: {
                  backgroundColor: color
                }
              }
            ),
            /* @__PURE__ */ jsx18(
              "input",
              {
                ref,
                className: "focus:placeholder:text-bg-500 h-8 w-full min-w-28 rounded-lg bg-transparent p-6 pl-0 tracking-wide placeholder:text-transparent focus:outline-hidden",
                placeholder: "#FFFFFF",
                value: color,
                onChange: (e) => {
                  updateColor(e.target.value);
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsx18(
            "button",
            {
              className: "text-bg-500 hover:bg-bg-200 hover:text-bg-800 dark:hover:bg-bg-700/70 dark:hover:text-bg-200 mr-4 shrink-0 rounded-lg p-2 transition-all focus:outline-hidden",
              onClick: () => {
                handleColorPickerOpen();
              },
              children: /* @__PURE__ */ jsx18(Icon9, { className: "size-6", icon: "tabler:color-picker" })
            }
          )
        ] })
      ]
    }
  );
}
var ColorInput_default = ColorInput;

// src/components/inputs/ImageAndFileInput/index.tsx
import { Icon as Icon10 } from "@iconify/react";
import { useTranslation as useTranslation7 } from "react-i18next";
import Zoom from "react-medium-image-zoom";
import _7 from "lodash";
import { jsx as jsx19, jsxs as jsxs10 } from "react/jsx-runtime";
function ImageAndFileInput({
  icon,
  name,
  reminderText,
  image,
  preview,
  setPreview,
  setImage,
  setImagePickerModalOpen,
  onImageRemoved,
  required,
  namespace
}) {
  const { t } = useTranslation7([namespace, "common.buttons"]);
  return /* @__PURE__ */ jsxs10("div", { className: "bg-bg-200/50 shadow-custom dark:bg-bg-800/50 flex w-full flex-col rounded-md p-6", children: [
    /* @__PURE__ */ jsxs10("div", { className: "text-bg-500 flex items-center gap-4", children: [
      /* @__PURE__ */ jsx19(Icon10, { className: "size-6", icon }),
      /* @__PURE__ */ jsxs10("span", { className: "font-medium", children: [
        t(`${namespace}:inputs.${_7.camelCase(name)}`),
        " ",
        required === true && /* @__PURE__ */ jsx19("span", { className: "text-red-500", children: "*" })
      ] })
    ] }),
    preview !== null && /* @__PURE__ */ jsx19(Zoom, { zoomMargin: 100, children: /* @__PURE__ */ jsx19(
      "img",
      {
        alt: "",
        className: "mx-auto mt-6 max-h-64 rounded-md",
        src: preview
      }
    ) }),
    preview !== null && /* @__PURE__ */ jsx19(
      Button_default,
      {
        isRed: true,
        className: "mt-6 w-full",
        icon: "tabler:x",
        onClick: () => {
          setPreview(null);
          setImage(null);
          onImageRemoved == null ? void 0 : onImageRemoved();
        },
        children: "Remove"
      }
    ),
    image !== null && preview === null && /* @__PURE__ */ jsxs10("div", { className: "mt-4 flex items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsx19("p", { className: "w-full truncate", children: image.name }),
      /* @__PURE__ */ jsx19(
        Button_default,
        {
          className: "p-2!",
          icon: "tabler:x",
          variant: "no-bg",
          onClick: () => {
            setImage(null);
            onImageRemoved == null ? void 0 : onImageRemoved();
          }
        }
      )
    ] }),
    image === null && preview === null && /* @__PURE__ */ jsxs10("div", { className: "mt-6 flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsx19(
        Button_default,
        {
          className: "w-full",
          icon: "tabler:upload",
          variant: "secondary",
          onClick: () => {
            setImagePickerModalOpen(true);
          },
          children: t("common.buttons:upload")
        }
      ),
      /* @__PURE__ */ jsx19("p", { className: "text-bg-500 text-xs", children: reminderText })
    ] })
  ] });
}
var ImageAndFileInput_default = ImageAndFileInput;

// src/components/inputs/ListboxOrComboboxInput/index.tsx
import { ComboboxInput, ListboxButton } from "@headlessui/react";
import { Icon as Icon11 } from "@iconify/react";
import { useTranslation as useTranslation8 } from "react-i18next";

// src/components/inputs/ListboxOrComboboxInput/components/ComboboxInputWrapper.tsx
import { Combobox } from "@headlessui/react";
import clsx14 from "clsx";
import { jsx as jsx20 } from "react/jsx-runtime";
function ComboboxInputWrapper({
  value,
  onChange,
  setQuery,
  children,
  className
}) {
  return /* @__PURE__ */ jsx20(
    Combobox,
    {
      as: "div",
      className: clsx14(
        "border-bg-500 bg-bg-200/50 shadow-custom hover:bg-bg-200 focus-within:border-custom-500! data-[open]:border-custom-500! dark:bg-bg-800/50 dark:hover:bg-bg-800/80 relative flex items-center gap-1 rounded-t-lg border-b-2 transition-all",
        className
      ),
      value,
      onChange,
      onClose: () => {
        setQuery("");
      },
      children
    }
  );
}
var ComboboxInputWrapper_default = ComboboxInputWrapper;

// src/components/inputs/ListboxOrComboboxInput/components/ListboxInputWrapper.tsx
import { Listbox } from "@headlessui/react";
import clsx15 from "clsx";
import { jsx as jsx21 } from "react/jsx-runtime";
function ListboxInputWrapper({
  value,
  onChange,
  multiple = false,
  className,
  children
}) {
  return /* @__PURE__ */ jsx21(
    Listbox,
    {
      as: "div",
      className: clsx15(
        "border-bg-500 bg-bg-200/50 shadow-custom hover:bg-bg-200 data-open:border-custom-500! dark:bg-bg-800/50 dark:hover:bg-bg-800/80 relative flex items-center gap-1 rounded-t-lg border-b-2 transition-all",
        className
      ),
      multiple,
      value,
      onChange,
      children
    }
  );
}
var ListboxInputWrapper_default = ListboxInputWrapper;

// src/components/inputs/ListboxOrComboboxInput/components/ListboxOrComboboxOptions.tsx
import {
  ListboxOptions as HeadlessListboxOptions,
  ComboboxOptions as HeadlessComboBoxOptions
} from "@headlessui/react";
import clsx16 from "clsx";
import { jsx as jsx22 } from "react/jsx-runtime";
function ListboxOrComboboxOptions({
  type = "listbox",
  children,
  customWidth,
  lighter = false
}) {
  const Element = type === "listbox" ? HeadlessListboxOptions : HeadlessComboBoxOptions;
  return /* @__PURE__ */ jsx22(
    Element,
    {
      transition: true,
      anchor: "bottom start",
      className: clsx16(
        customWidth != null ? customWidth : type === "listbox" ? "w-[var(--button-width)]" : "w-[var(--input-width)]",
        "divide-bg-200 border-bg-200 dark:border-bg-700 z-9999 divide-y overflow-auto rounded-md border",
        lighter ? "bg-bg-50" : "bg-bg-100",
        "text-bg-500 text-base shadow-lg transition duration-100 ease-out",
        type === "listbox" ? "[--anchor-gap:12px]" : "[--anchor-gap:22px]",
        "dark:divide-bg-700/50 dark:border-bg-700 dark:bg-bg-800 empty:invisible focus:outline-hidden data-closed:scale-95 data-closed:opacity-0"
      ),
      children
    }
  );
}
var ListboxOrComboboxOptions_default = ListboxOrComboboxOptions;

// src/components/inputs/ListboxOrComboboxInput/index.tsx
import _8 from "lodash";
import { jsx as jsx23, jsxs as jsxs11 } from "react/jsx-runtime";
function ListboxOrComboboxInput(props) {
  const {
    name,
    icon,
    value,
    setValue,
    type,
    children,
    required,
    customActive,
    namespace,
    tKey = ""
  } = props;
  const { t } = useTranslation8(namespace ? namespace : void 0);
  switch (type) {
    case "listbox":
    case void 0:
      return /* @__PURE__ */ jsxs11(
        ListboxInputWrapper_default,
        {
          className: props.className,
          multiple: props.multiple,
          value,
          onChange: setValue,
          children: [
            /* @__PURE__ */ jsxs11(ListboxButton, { className: "group flex w-full items-center pl-6", children: [
              /* @__PURE__ */ jsx23(
                InputIcon_default,
                {
                  active: value !== null && value.length !== 0 || customActive === true,
                  icon,
                  listboxOrCombobox: "listbox"
                }
              ),
              /* @__PURE__ */ jsx23(
                InputLabel_default,
                {
                  isListboxOrCombobox: true,
                  active: value !== null && value.length !== 0 || customActive === true,
                  label: t(
                    namespace !== false ? t([
                      [tKey, "inputs", _8.camelCase(name), "label"].filter((e) => e).join("."),
                      [tKey, "inputs", _8.camelCase(name)].filter((e) => e).join(".")
                    ]) : name
                  ),
                  required: required === true
                }
              ),
              /* @__PURE__ */ jsx23("div", { className: "relative mt-10 mb-3 flex min-h-[1.2rem] w-full items-center gap-2 rounded-lg pr-10 pl-5 text-left focus:outline-hidden", children: (value !== null && value.length !== 0 || props.customActive === true) && props.buttonContent }),
              /* @__PURE__ */ jsx23("span", { className: "pointer-events-none absolute inset-y-0 right-0 mt-1 mr-2 flex items-center pr-4", children: /* @__PURE__ */ jsx23(
                Icon11,
                {
                  className: "size-5 text-zinc-500",
                  icon: "tabler:chevron-down"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx23(ListboxOrComboboxOptions_default, { children })
          ]
        }
      );
    case "combobox":
      return /* @__PURE__ */ jsxs11(
        ComboboxInputWrapper_default,
        {
          className: props.className,
          setQuery: props.setQuery,
          value,
          onChange: setValue,
          children: [
            /* @__PURE__ */ jsxs11("div", { className: "group relative flex w-full items-center", children: [
              /* @__PURE__ */ jsx23(
                InputIcon_default,
                {
                  active: value !== null && value.length !== 0 || customActive === true,
                  className: "absolute left-6",
                  icon,
                  listboxOrCombobox: "combobox"
                }
              ),
              /* @__PURE__ */ jsx23(
                InputLabel_default,
                {
                  isCombobox: true,
                  isListboxOrCombobox: true,
                  active: value !== null && value.length !== 0 || customActive === true,
                  label: t(`inputs.${_8.camelCase(name)}`),
                  required: required === true
                }
              ),
              /* @__PURE__ */ jsx23(
                ComboboxInput,
                {
                  className: "relative mt-10 mb-3 flex w-full items-center gap-2 rounded-lg bg-transparent! pr-5 pl-17.5 text-left focus:outline-hidden",
                  displayValue: props.displayValue,
                  onChange: (e) => {
                    props.setQuery(e.target.value);
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsx23(ListboxOrComboboxOptions_default, { type: "combobox", children })
          ]
        }
      );
  }
}
var ListboxOrComboboxInput_default = ListboxOrComboboxInput;

// src/components/inputs/DateInput.tsx
import { Icon as Icon12 } from "@iconify/react";
import clsx17 from "clsx";
import { useRef as useRef5 } from "react";
import DatePicker from "react-date-picker";
import DateTimePicker from "react-datetime-picker";
import { useTranslation as useTranslation9 } from "react-i18next";
import _9 from "lodash";
import { jsx as jsx24, jsxs as jsxs12 } from "react/jsx-runtime";
var DateInput = ({
  date,
  setDate,
  name,
  icon,
  hasMargin = true,
  className = "",
  darker = false,
  modalRef,
  index = 0,
  required,
  hasTime = false,
  namespace
}) => {
  var _a;
  const FinalComponent = hasTime ? DateTimePicker : DatePicker;
  const { t } = useTranslation9(namespace);
  const { language } = useLifeforgeUIContext();
  const ref = useRef5(null);
  function updateCalendarLocation() {
    setTimeout(() => {
      if ((modalRef == null ? void 0 : modalRef.current) === null || ref.current === null) {
        return;
      }
      const reactCalendar = document.querySelectorAll(".react-calendar")[index];
      const calendarInput = ref.current.querySelector(
        hasTime ? ".react-datetime-picker" : ".react-date-picker"
      );
      if (!reactCalendar || !calendarInput) {
        return;
      }
      const inputRect = calendarInput.getBoundingClientRect();
      if (hasTime) {
        const reactClock = document.querySelectorAll(
          ".react-datetime-picker__clock"
        )[index];
        if (reactClock) {
          reactClock.style.position = "absolute";
          reactClock.style.top = `${inputRect.top + inputRect.height + window.scrollY}px`;
          reactClock.style.left = `${inputRect.left + window.scrollX}px`;
        }
      }
      reactCalendar.style.top = `${inputRect.top + inputRect.height + window.scrollY}px`;
      reactCalendar.style.left = `${inputRect.left + window.scrollX}px`;
    }, 10);
  }
  return /* @__PURE__ */ jsxs12(
    InputWrapper_default,
    {
      className: clsx17(className, hasMargin && "mt-4"),
      darker,
      children: [
        /* @__PURE__ */ jsx24(InputIcon_default, { active: date !== "", icon }),
        /* @__PURE__ */ jsxs12("div", { ref, className: "flex w-full items-center gap-2", children: [
          /* @__PURE__ */ jsx24(
            InputLabel_default,
            {
              active: true,
              label: t(`inputs.${_9.camelCase(name)}`),
              required: required === true
            }
          ),
          /* @__PURE__ */ jsx24(
            FinalComponent,
            {
              calendarIcon: null,
              calendarProps: {
                className: "bg-bg-200! dark:bg-bg-800! absolute z-9999 outline-hidden border-bg-200! dark:border-bg-700! rounded-lg p-4",
                tileClassName: "hover:bg-bg-300 dark:hover:bg-bg-700/50! rounded-md disabled:text-bg-500 disabled:bg-transparent disabled:cursor-not-allowed disabled:hover:bg-transparent! dark:disabled:hover:bg-transparent!",
                locale: language,
                prevLabel: /* @__PURE__ */ jsx24(Icon12, { icon: "tabler:chevron-left" }),
                nextLabel: /* @__PURE__ */ jsx24(Icon12, { icon: "tabler:chevron-right" }),
                prev2Label: /* @__PURE__ */ jsx24(Icon12, { icon: "tabler:chevrons-left" }),
                next2Label: /* @__PURE__ */ jsx24(Icon12, { icon: "tabler:chevrons-right" })
              },
              className: "focus:placeholder:text-bg-500 mt-6 h-10 w-full rounded-lg border-none bg-transparent px-4 tracking-wider outline-hidden placeholder:text-transparent focus:outline-hidden",
              clearIcon: null,
              format: hasTime ? "dd-MM-yyyy HH:mm" : "dd-MM-yyyy",
              portalContainer: (_a = modalRef == null ? void 0 : modalRef.current) != null ? _a : document.querySelector("#app"),
              value: date,
              onCalendarOpen: updateCalendarLocation,
              onChange: (newDate) => {
                setDate(newDate);
              },
              onClockOpen: updateCalendarLocation
            }
          ),
          date !== "" && /* @__PURE__ */ jsx24(
            "button",
            {
              "aria-label": "Clear date",
              className: "text-bg-500 hover:bg-bg-300 hover:text-bg-800 dark:hover:bg-bg-700/70 dark:hover:text-bg-200 mr-4 shrink-0 rounded-lg p-2 transition-all focus:outline-hidden",
              onClick: () => {
                setDate("");
              },
              children: /* @__PURE__ */ jsx24(Icon12, { className: "size-6", icon: "tabler:x" })
            }
          )
        ] })
      ]
    }
  );
};
var DateInput_default = DateInput;

// src/components/inputs/CurrencyInput.tsx
import CurrencyInput from "react-currency-input-field";
import { useTranslation as useTranslation10 } from "react-i18next";
import _10 from "lodash";
import { jsx as jsx25, jsxs as jsxs13 } from "react/jsx-runtime";
function CurrencyInputComponent({
  name,
  placeholder,
  icon,
  value,
  setValue,
  darker = false,
  className = "",
  required,
  namespace
}) {
  const { t } = useTranslation10(namespace);
  return /* @__PURE__ */ jsxs13(InputWrapper_default, { className, darker, children: [
    /* @__PURE__ */ jsx25(InputIcon_default, { active: !!value, icon }),
    /* @__PURE__ */ jsxs13("div", { className: "flex w-full items-center gap-2", children: [
      /* @__PURE__ */ jsx25(
        InputLabel_default,
        {
          active: !!value,
          label: t(`inputs.${_10.camelCase(name)}`),
          required: required === true
        }
      ),
      /* @__PURE__ */ jsx25(
        CurrencyInput,
        {
          className: "focus:placeholder:text-bg-500 mt-6 h-8 w-full rounded-lg bg-transparent p-6 pl-4 tracking-wider placeholder:text-transparent focus:outline-hidden",
          decimalsLimit: 2,
          name,
          placeholder,
          value,
          onValueChange: (value2) => setValue(value2 != null ? value2 : "")
        }
      )
    ] })
  ] });
}
var CurrencyInput_default = CurrencyInputComponent;

// src/components/inputs/SearchInput.tsx
import { Icon as Icon13 } from "@iconify/react";
import clsx18 from "clsx";
import { useMemo as useMemo3 } from "react";
import { useTranslation as useTranslation11 } from "react-i18next";
import _11 from "lodash";
import { jsx as jsx26, jsxs as jsxs14 } from "react/jsx-runtime";
function SearchInput({
  searchQuery,
  setSearchQuery,
  stuffToSearch,
  onKeyUp,
  customIcon,
  hasTopMargin = true,
  onFilterIconClick,
  filterAmount,
  sideButtonIcon,
  onSideButtonClick,
  className,
  namespace,
  tKey = ""
}) {
  const { t } = useTranslation11(["common.misc", namespace]);
  const { bgImage } = useLifeforgeUIContext();
  const componentBgLighterWithHover = useMemo3(() => {
    if (bgImage !== "") {
      return "bg-bg-50 dark:bg-bg-800/50 hover:bg-bg-200/50 dark:hover:bg-bg-700/50 transition-all";
    }
    return "bg-bg-50 dark:bg-bg-800/50 dark:hover:bg-bg-800/80 hover:bg-bg-50/50 transition-all";
  }, [bgImage]);
  return /* @__PURE__ */ jsxs14(
    "search",
    {
      className: clsx18(
        "shadow-custom flex min-h-14 w-full cursor-text items-center gap-4 rounded-lg px-4 transition-all",
        componentBgLighterWithHover,
        hasTopMargin && "mt-4",
        className
      ),
      onClick: (e) => {
        var _a;
        (_a = e.currentTarget.querySelector("input")) == null ? void 0 : _a.focus();
      },
      children: [
        /* @__PURE__ */ jsx26(
          Icon13,
          {
            className: "text-bg-500 size-5 shrink-0",
            icon: customIcon != null ? customIcon : "tabler:search"
          }
        ),
        /* @__PURE__ */ jsx26(
          "input",
          {
            className: "caret-custom-500 placeholder:text-bg-500 w-full bg-transparent",
            placeholder: t(`search`, {
              item: t([
                `${namespace}:${[tKey, "items", _11.camelCase(stuffToSearch)].filter((e) => e).join(".")}`,
                stuffToSearch
              ])
            }),
            type: "text",
            value: searchQuery,
            onChange: (e) => {
              setSearchQuery(e.target.value);
            },
            onKeyUp
          }
        ),
        onFilterIconClick !== void 0 && /* @__PURE__ */ jsxs14(
          "button",
          {
            className: clsx18(
              "flex items-center gap-1 rounded-lg p-2",
              filterAmount !== void 0 && filterAmount > 0 ? "text-bg-900 dark:text-bg-100" : "text-bg-500 hover:text-bg-900 dark:hover:text-bg-100",
              "hover:bg-bg-200 dark:hover:bg-bg-700/50 transition-all"
            ),
            onClick: onFilterIconClick,
            children: [
              /* @__PURE__ */ jsx26(Icon13, { className: "text-xl", icon: "tabler:filter" }),
              filterAmount !== void 0 && filterAmount > 0 && /* @__PURE__ */ jsxs14("span", { className: "-mt-0.5", children: [
                "(",
                filterAmount,
                ")"
              ] })
            ]
          }
        ),
        sideButtonIcon !== void 0 && onSideButtonClick !== void 0 && /* @__PURE__ */ jsx26(
          "button",
          {
            className: "text-bg-500 hover:bg-bg-200 hover:text-bg-900 dark:hover:bg-bg-700/50 dark:hover:text-bg-100 flex items-center gap-1 rounded-lg p-2 transition-all",
            onClick: onSideButtonClick,
            children: /* @__PURE__ */ jsx26(Icon13, { className: "text-xl", icon: sideButtonIcon })
          }
        )
      ]
    }
  );
}
var SearchInput_default = SearchInput;

// src/components/inputs/TagsInput.tsx
import { Icon as Icon14 } from "@iconify/react";
import { useRef as useRef6, useState as useState3 } from "react";
import { useTranslation as useTranslation12 } from "react-i18next";
import _12 from "lodash";
import { jsx as jsx27, jsxs as jsxs15 } from "react/jsx-runtime";
function TagsInput({
  name,
  icon,
  placeholder,
  value,
  setValue,
  maxTags = 100,
  disabled = false,
  className = "",
  darker,
  existedTags,
  required,
  namespace,
  tKey = ""
}) {
  const { t } = useTranslation12(namespace);
  const [currentTag, setCurrentTag] = useState3("");
  const inputRef = useRef6(null);
  const addTag = () => {
    if (currentTag.trim() !== "" && value.length < maxTags) {
      setValue([...value, currentTag.trim()]);
      setCurrentTag("");
    }
  };
  const removeTag = (index) => {
    const newTags = value.filter((_20, i) => i !== index);
    setValue(newTags);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && currentTag === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  };
  return /* @__PURE__ */ jsxs15(
    InputWrapper_default,
    {
      className,
      darker,
      disabled,
      inputRef,
      children: [
        /* @__PURE__ */ jsx27(InputIcon_default, { active: String(value).length > 0, icon }),
        /* @__PURE__ */ jsxs15("div", { className: "flex w-full items-center gap-2", children: [
          /* @__PURE__ */ jsx27(
            InputLabel_default,
            {
              active: String(value).length > 0,
              label: t([
                [tKey, "inputs", _12.camelCase(name)].filter((e) => e).join("."),
                [tKey, "inputs", _12.camelCase(name), "label"].filter((e) => e).join(".")
              ]),
              required: required === true
            }
          ),
          /* @__PURE__ */ jsxs15("div", { className: "mt-12 mb-4 ml-[14px] flex flex-wrap items-center gap-2", children: [
            value.map((tag, index) => {
              const existedTag = existedTags == null ? void 0 : existedTags.find((t2) => t2.name === tag);
              return /* @__PURE__ */ jsxs15(
                "div",
                {
                  className: "bg-bg-200 dark:bg-bg-700/50 flex items-center rounded-full py-1 pr-2 pl-3",
                  children: [
                    existedTag !== void 0 && /* @__PURE__ */ jsx27(
                      Icon14,
                      {
                        className: "mr-2 size-3",
                        icon: existedTag.icon,
                        style: { color: existedTag.color }
                      }
                    ),
                    /* @__PURE__ */ jsx27("span", { className: "mr-2 text-sm", children: tag }),
                    !disabled && /* @__PURE__ */ jsx27(
                      Button_default,
                      {
                        className: "m-0! h-4! w-4! p-0!",
                        icon: "tabler:x",
                        iconClassName: "size-3",
                        variant: "no-bg",
                        onClick: () => {
                          removeTag(index);
                        }
                      }
                    )
                  ]
                },
                index
              );
            }),
            !disabled && /* @__PURE__ */ jsx27(
              InputBox_default,
              {
                noAutoComplete: true,
                className: "my-0! w-auto! flex-1 py-0 pl-0!",
                inputRef,
                placeholder,
                setValue: setCurrentTag,
                value: currentTag,
                onBlur: addTag,
                onKeyDown: handleKeyDown
              }
            )
          ] })
        ] })
      ]
    }
  );
}
var TagsInput_default = TagsInput;

// src/components/inputs/LocationInput.tsx
import { useDebounce as useDebounce2 } from "@uidotdev/usehooks";
import { useEffect as useEffect5, useState as useState11 } from "react";

// src/components/screens/ErrorScreen.tsx
import { Icon as Icon15 } from "@iconify/react";
import { jsx as jsx28, jsxs as jsxs16 } from "react/jsx-runtime";
function ErrorScreen({ message }) {
  return /* @__PURE__ */ jsxs16("div", { className: "flex-center size-full flex-col gap-6", children: [
    /* @__PURE__ */ jsx28(Icon15, { className: "size-12 text-red-500", icon: "tabler:alert-triangle" }),
    /* @__PURE__ */ jsx28("p", { className: "text-center text-lg font-medium text-red-500", children: message })
  ] });
}
var ErrorScreen_default = ErrorScreen;

// src/components/screens/LoadingScreen.tsx
import { jsx as jsx29, jsxs as jsxs17 } from "react/jsx-runtime";
function LoadingScreen({
  customMessage
}) {
  return /* @__PURE__ */ jsxs17("div", { className: "flex-center size-full flex-col gap-6", children: [
    /* @__PURE__ */ jsx29("span", { className: "loader" }),
    /* @__PURE__ */ jsx29("p", { className: "text-bg-500 text-lg font-medium", children: customMessage != null ? customMessage : "" })
  ] });
}

// src/components/screens/APIFallbackComponent.tsx
import { Fragment as Fragment3, jsx as jsx30 } from "react/jsx-runtime";
function APIFallbackComponent({
  data,
  children,
  showLoading = true
}) {
  switch (data) {
    case "loading":
      return showLoading ? /* @__PURE__ */ jsx30(LoadingScreen, {}) : /* @__PURE__ */ jsx30(Fragment3, {});
    case "error":
      return /* @__PURE__ */ jsx30(ErrorScreen_default, { message: "Failed to fetch data from server." });
    default:
      return /* @__PURE__ */ jsx30(Fragment3, { children: children(data) });
  }
}
var APIFallbackComponent_default = APIFallbackComponent;

// src/components/screens/CreatePasswordScreen.tsx
import { Icon as Icon18 } from "@iconify/react";
import { useRef as useRef7, useState as useState7 } from "react";
import { useTranslation as useTranslation15 } from "react-i18next";
import { toast as toast3 } from "react-toastify";

// src/components/modals/FormModal/index.tsx
import { useQueryClient } from "@tanstack/react-query";
import { useState as useState5 } from "react";

// src/hooks/useModifyMutation.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// src/utils/fetchAPI.ts
import { cookieParse } from "pocketbase";
function getRequestBody(body, isJSON) {
  return isJSON ? JSON.stringify(body) : body;
}
function fetchAPI(_0) {
  return __async(this, arguments, function* (endpoint, {
    method = "GET",
    body,
    timeout = 3e4,
    raiseError = true
  } = {}) {
    var _a;
    const { apiHost } = useLifeforgeUIContext();
    const isJSON = !!body && !(body instanceof FormData || body instanceof URLSearchParams || body instanceof Blob);
    const cookies = cookieParse(document.cookie);
    const token = (_a = cookies.token) != null ? _a : "";
    try {
      const url = new URL(endpoint, apiHost);
      const response = yield fetch(url.toString(), {
        method,
        signal: AbortSignal.timeout(timeout),
        headers: __spreadValues({
          Authorization: token ? `Bearer ${token}` : ""
        }, isJSON ? { "Content-Type": "application/json" } : {}),
        body: body && getRequestBody(body, isJSON)
      });
      if (!response.ok) {
        const data2 = yield response.json();
        throw new Error(data2.message || "Failed to perform API request");
      }
      if (response.status === 204) {
        return void 0;
      }
      const data = yield response.json();
      if (data.state === "error") {
        throw new Error(data.message || "API returned an error");
      }
      if (data.state === "success") {
        return data.data;
      }
      throw new Error("Unexpected API response format");
    } catch (err) {
      if (raiseError) {
        throw err instanceof Error ? err : new Error("Failed to perform API request");
      }
      return void 0;
    }
  });
}

// src/hooks/useModifyMutation.ts
function useModifyMutation(type, endpoint, options) {
  return useMutation({
    mutationFn: (data) => __async(this, null, function* () {
      if (Object.values(data).some(
        (value) => value instanceof File || typeof value === "object" && (value == null ? void 0 : value.image) instanceof File
      )) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value instanceof File) {
            formData.append(key, value);
          } else if (typeof value === "object" && (value == null ? void 0 : value.image) instanceof File) {
            formData.append(key, value.image);
          } else if (typeof value !== "string") {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        });
        return fetchAPI(endpoint, {
          method: type === "create" ? "POST" : "PATCH",
          body: formData
        });
      }
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (typeof value === "object" && Object.keys(value != null ? value : {}).includes("image")) {
          if (typeof value.image === "string") {
            data[key] = value.image;
          } else if (!value.image) {
            delete data[key];
          }
        }
      });
      return fetchAPI(endpoint, {
        method: type === "create" ? "POST" : "PATCH",
        body: data
      });
    }),
    onSuccess: (newData) => {
      var _a;
      toast.success(
        `Successfully ${type === "create" ? "created" : "updated"}!`
      );
      (_a = options == null ? void 0 : options.onSuccess) == null ? void 0 : _a.call(options, newData);
    },
    onSettled: () => {
      var _a;
      (_a = options == null ? void 0 : options.onSettled) == null ? void 0 : _a.call(options);
    },
    onError: (err) => {
      var _a;
      console.error(err);
      toast.error(`Failed to ${type === "create" ? "create" : "update"}`);
      (_a = options == null ? void 0 : options.onError) == null ? void 0 : _a.call(options);
    }
  });
}
var useModifyMutation_default = useModifyMutation;

// src/components/modals/FormModal/components/FormInputs.tsx
import { Icon as Icon16 } from "@iconify/react";
import { Fragment as Fragment4, jsx as jsx31, jsxs as jsxs18 } from "react/jsx-runtime";
function FormInputs({
  fields,
  data,
  setData,
  namespace,
  setColorPickerOpen,
  setIconSelectorOpen,
  setImagePickerModalOpen,
  setQrScannerModalOpen
}) {
  const handleChange = (field) => {
    return (value) => {
      setData((prev) => __spreadProps(__spreadValues({}, prev), { [field.id]: value }));
    };
  };
  return /* @__PURE__ */ jsx31("div", { className: "space-y-4", children: fields.map((field) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const selectedData = data[field.id];
    switch (field.type) {
      case "text":
        return /* @__PURE__ */ jsx31(
          TextInput_default,
          {
            darker: true,
            actionButtonIcon: field.qrScanner ? "tabler:qrcode" : "",
            disabled: field.disabled,
            icon: field.icon,
            isPassword: field.isPassword,
            name: field.label,
            namespace,
            placeholder: field.placeholder,
            setValue: handleChange(field),
            value: selectedData,
            onActionButtonClick: () => {
              setQrScannerModalOpen(field.id);
            }
          },
          field.id
        );
      case "datetime":
        return /* @__PURE__ */ jsx31(
          DateInput_default,
          {
            darker: true,
            date: selectedData,
            hasTime: field.hasTime,
            icon: field.icon,
            index: field.index,
            modalRef: field.modalRef,
            name: field.label,
            namespace,
            setDate: handleChange(field)
          },
          field.id
        );
      case "listbox":
        return /* @__PURE__ */ jsxs18(
          ListboxOrComboboxInput_default,
          {
            buttonContent: field.multiple === true && Array.isArray(selectedData) ? /* @__PURE__ */ jsx31(Fragment4, { children: selectedData.length > 0 ? selectedData.map((item, i) => {
              var _a2, _b2, _c2, _d2;
              return /* @__PURE__ */ jsxs18(Fragment4, { children: [
                /* @__PURE__ */ jsx31(
                  Icon16,
                  {
                    className: "size-5",
                    icon: (_b2 = (_a2 = field.options.find((l) => l.value === item)) == null ? void 0 : _a2.icon) != null ? _b2 : ""
                  },
                  item
                ),
                /* @__PURE__ */ jsx31("span", { className: "-mt-px block truncate", children: (_d2 = (_c2 = field.options.find((l) => l.value === item)) == null ? void 0 : _c2.text) != null ? _d2 : "None" }),
                i !== selectedData.length - 1 && /* @__PURE__ */ jsx31(
                  Icon16,
                  {
                    className: "size-1",
                    icon: "tabler:circle-filled"
                  }
                )
              ] });
            }) : /* @__PURE__ */ jsxs18(Fragment4, { children: [
              field.nullOption !== void 0 && /* @__PURE__ */ jsx31(Icon16, { className: "size-5", icon: field.nullOption }),
              "None"
            ] }) }) : /* @__PURE__ */ jsxs18(Fragment4, { children: [
              /* @__PURE__ */ jsx31(
                Icon16,
                {
                  className: "size-5",
                  icon: (_c = (_b = (_a = field.options.find((l) => l.value === selectedData)) == null ? void 0 : _a.icon) != null ? _b : field.nullOption) != null ? _c : "",
                  style: {
                    color: (_d = field.options.find(
                      (l) => l.value === selectedData
                    )) == null ? void 0 : _d.color
                  }
                }
              ),
              field.options.length && field.options[0].icon === void 0 && field.options[0].color !== void 0 && /* @__PURE__ */ jsx31(
                "span",
                {
                  className: "size-2 rounded-full",
                  style: {
                    backgroundColor: (_e = field.options.find(
                      (l) => l.value === selectedData
                    )) == null ? void 0 : _e.color
                  }
                }
              ),
              /* @__PURE__ */ jsx31("span", { className: "-mt-px block truncate", children: (_g = (_f = field.options.find((l) => l.value === selectedData)) == null ? void 0 : _f.text) != null ? _g : "None" })
            ] }),
            icon: field.icon,
            multiple: field.multiple,
            name: field.label,
            namespace,
            setValue: handleChange(field),
            type: "listbox",
            value: selectedData,
            children: [
              field.nullOption !== void 0 && /* @__PURE__ */ jsx31(
                ListboxNullOption_default,
                {
                  hasBgColor: ((_h = field.options[0]) == null ? void 0 : _h.color) !== void 0,
                  icon: field.nullOption
                }
              ),
              field.options.map(({ text, color, icon, value }) => /* @__PURE__ */ jsx31(
                ListboxOrComboboxOption_default,
                {
                  color,
                  icon,
                  text,
                  value
                },
                value
              ))
            ]
          },
          field.id
        );
      case "color":
        return /* @__PURE__ */ jsx31(
          ColorInput_default,
          {
            color: selectedData,
            name: field.label,
            namespace,
            setColor: handleChange(field),
            setColorPickerOpen: () => {
              setColorPickerOpen(field.id);
            }
          },
          field.id
        );
      case "icon":
        return /* @__PURE__ */ jsx31(
          IconInput_default,
          {
            icon: selectedData,
            name: field.label,
            namespace,
            setIcon: handleChange(field),
            setIconSelectorOpen: () => {
              setIconSelectorOpen(field.id);
            }
          },
          field.id
        );
      case "location":
        return /* @__PURE__ */ jsx31(
          LocationInput_default,
          {
            label: field.label,
            location: selectedData,
            namespace,
            setLocation: (value) => handleChange(field)(value != null ? value : "")
          },
          field.id
        );
      case "file":
        return /* @__PURE__ */ jsx31(
          ImageAndFileInput_default,
          {
            icon: "tabler:file",
            image: selectedData.image,
            name: field.label,
            namespace,
            preview: selectedData.preview,
            setImage: (value) => handleChange(field)(__spreadProps(__spreadValues({}, selectedData), {
              image: value
            })),
            setImagePickerModalOpen: () => {
              var _a2;
              setImagePickerModalOpen(field.id);
              (_a2 = field.onFileRemoved) == null ? void 0 : _a2.call(field);
            },
            setPreview: (value) => handleChange(field)(__spreadProps(__spreadValues({}, selectedData), {
              preview: value
            })),
            onImageRemoved: () => handleChange(field)({
              image: null,
              preview: null
            })
          }
        );
      default:
        return /* @__PURE__ */ jsx31(Fragment4, {});
    }
  }) });
}
var FormInputs_default = FormInputs;

// src/components/modals/FormModal/components/PickerModals.tsx
import { Fragment as Fragment5, jsx as jsx32, jsxs as jsxs19 } from "react/jsx-runtime";
function PickerModals({
  fields,
  data,
  setData,
  colorPickerOpen,
  setColorPickerOpen,
  iconSelectorOpen,
  setIconSelectorOpen,
  imagePickerModalOpen,
  setImagePickerModalOpen,
  qrScannerModalOpen,
  setQRScannerModalOpen
}) {
  var _a;
  return /* @__PURE__ */ jsxs19(Fragment5, { children: [
    fields.some((f) => f.type === "color") && /* @__PURE__ */ jsx32(
      ColorPickerModal_default,
      {
        color: (_a = data[colorPickerOpen != null ? colorPickerOpen : ""]) != null ? _a : "#FFFFFF",
        isOpen: colorPickerOpen !== null,
        setColor: (value) => {
          setData((prev) => __spreadProps(__spreadValues({}, prev), {
            [colorPickerOpen != null ? colorPickerOpen : ""]: value
          }));
        },
        setOpen: () => {
          setColorPickerOpen(null);
        }
      }
    ),
    fields.some((f) => f.type === "icon") && /* @__PURE__ */ jsx32(
      IconPickerModal_default,
      {
        isOpen: iconSelectorOpen !== null,
        setOpen: () => {
          setIconSelectorOpen(null);
        },
        setSelectedIcon: (value) => {
          setData((prev) => __spreadProps(__spreadValues({}, prev), {
            [iconSelectorOpen != null ? iconSelectorOpen : ""]: value
          }));
        }
      }
    ),
    fields.some((f) => f.type === "file") && /* @__PURE__ */ jsx32(
      ImagePickerModal_default,
      {
        enablePixaBay: true,
        enableUrl: true,
        acceptedMimeTypes: {
          images: ["image/png", "image/jpeg", "image/webp"]
        },
        isOpen: imagePickerModalOpen !== null,
        onClose: () => {
          setImagePickerModalOpen(null);
        },
        onSelect: (file, preview) => __async(this, null, function* () {
          setData((prev) => __spreadProps(__spreadValues({}, prev), {
            [imagePickerModalOpen != null ? imagePickerModalOpen : ""]: {
              image: file,
              preview
            }
          }));
        })
      }
    ),
    fields.some((f) => Object.keys(f).includes("qrScanner")) && /* @__PURE__ */ jsx32(
      QRCodeScanner_default,
      {
        isOpen: qrScannerModalOpen !== null,
        onClose: () => {
          setQRScannerModalOpen(null);
        },
        onScanned: (data2) => {
          setData((prev) => __spreadProps(__spreadValues({}, prev), {
            [qrScannerModalOpen != null ? qrScannerModalOpen : ""]: data2
          }));
        }
      }
    )
  ] });
}
var PickerModals_default = PickerModals;

// src/components/modals/FormModal/components/SubmitButton.tsx
import { Fragment as Fragment6, jsx as jsx33 } from "react/jsx-runtime";
function SubmitButton({
  submitButtonProps,
  submitLoading,
  openType,
  onSubmitButtonClick
}) {
  return /* @__PURE__ */ jsx33(Fragment6, { children: ["create", "update"].includes(openType != null ? openType : "") ? /* @__PURE__ */ jsx33(
    CreateOrModifyButton_default,
    {
      loading: submitLoading,
      type: openType,
      onClick: () => {
        onSubmitButtonClick().catch(console.error);
      }
    }
  ) : /* @__PURE__ */ jsx33(
    Button_default,
    __spreadProps(__spreadValues({
      className: "mt-4"
    }, submitButtonProps), {
      loading: submitLoading,
      onClick: () => {
        onSubmitButtonClick().catch(console.error);
      }
    })
  ) });
}
var SubmitButton_default = SubmitButton;

// src/components/modals/ModalHeader.tsx
import { Icon as Icon17 } from "@iconify/react";
import { useDebounce } from "@uidotdev/usehooks";
import clsx19 from "clsx";
import { useTranslation as useTranslation13 } from "react-i18next";
import _13 from "lodash";
import { jsx as jsx34, jsxs as jsxs20 } from "react/jsx-runtime";
function ModalHeader({
  title,
  needTranslate = true,
  icon,
  hasAI = false,
  onClose,
  actionButtonIcon,
  actionButtonIsRed = false,
  onActionButtonClick,
  className = "",
  appendTitle,
  namespace = "common.modals"
}) {
  const { t } = useTranslation13(namespace);
  const innerTitle = useDebounce(title, 100);
  const innerIcon = useDebounce(icon, 100);
  return /* @__PURE__ */ jsxs20("div", { className: clsx19("flex-between mb-4 flex gap-4", className), children: [
    /* @__PURE__ */ jsxs20("h1", { className: "flex w-full min-w-0 items-center gap-3 text-2xl font-semibold", children: [
      /* @__PURE__ */ jsx34(Icon17, { className: "size-7 shrink-0", icon: innerIcon }),
      /* @__PURE__ */ jsx34("span", { className: "min-w-0 truncate", children: needTranslate ? t([
        `modals.${_13.camelCase(innerTitle)}.title`,
        `modals.${_13.camelCase(innerTitle)}`,
        `${_13.camelCase(innerTitle)}.title`,
        `${_13.camelCase(innerTitle)}`,
        `${innerTitle}.title`,
        `${innerTitle}`,
        `modals.${innerTitle}.title`,
        `modals.${innerTitle}`
      ]) : innerTitle }),
      hasAI && /* @__PURE__ */ jsx34(
        Icon17,
        {
          className: "size-5 shrink-0 text-yellow-500",
          icon: "mage:stars-c"
        }
      ),
      appendTitle
    ] }),
    /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-2", children: [
      actionButtonIcon !== void 0 && /* @__PURE__ */ jsx34(
        "button",
        {
          className: clsx19(
            "hover:bg-bg-100 dark:hover:bg-bg-800 rounded-md p-2 transition-all",
            actionButtonIsRed ? "text-red-500 hover:text-red-600" : "text-bg-500 hover:text-bg-200"
          ),
          onClick: onActionButtonClick,
          children: /* @__PURE__ */ jsx34(Icon17, { className: "size-6", icon: actionButtonIcon })
        }
      ),
      /* @__PURE__ */ jsx34(
        Button_default,
        {
          icon: "tabler:x",
          iconClassName: "size-6",
          variant: "no-bg",
          onClick: () => {
            onClose();
          }
        }
      )
    ] })
  ] });
}
var ModalHeader_default = ModalHeader;

// src/components/modals/ModalWrapper.tsx
import clsx20 from "clsx";
import { useEffect as useEffect2, useState as useState4 } from "react";
import { jsx as jsx35 } from "react/jsx-runtime";
function ModalWrapper({
  isOpen,
  children,
  minWidth,
  minHeight,
  maxWidth,
  className,
  modalRef
}) {
  const [innerIsOpen, setInnerIsOpen] = useState4(false);
  const [firstTime, setFirstTime] = useState4(true);
  useEffect2(() => {
    if (!isOpen && !firstTime) {
      setTimeout(() => {
        setInnerIsOpen(false);
      }, 500);
    } else {
      setInnerIsOpen(true);
    }
    setFirstTime(false);
  }, [isOpen, setInnerIsOpen, firstTime]);
  return /* @__PURE__ */ jsx35(
    "div",
    {
      ref: modalRef,
      className: clsx20(
        "dark:bg-bg-950/40 fixed top-0 left-0 h-dvh w-full overscroll-contain bg-black/10 backdrop-blur-xs transition-opacity ease-linear",
        isOpen ? "z-9990 opacity-100" : "z-[-1] opacity-0 [transition:z-index_0.1s_linear_0.5s,opacity_0.1s_linear_0.1s]"
      ),
      children: /* @__PURE__ */ jsx35(
        "div",
        {
          className: clsx20(
            "bg-bg-100 dark:bg-bg-900 absolute top-1/2 flex max-h-[calc(100dvh-8rem)] w-full max-w-[calc(100vw-4rem)] -translate-y-1/2 translate-x-1/2 flex-col overflow-auto rounded-xl p-6 shadow-2xl transition-all duration-500 sm:max-w-[calc(100vw-8rem)] lg:w-auto",
            isOpen ? "right-1/2" : "right-[-100dvw]",
            className
          ),
          style: {
            minWidth,
            minHeight,
            maxWidth
          },
          children: innerIsOpen && children
        }
      )
    }
  );
}
var ModalWrapper_default = ModalWrapper;

// src/components/modals/FormModal/index.tsx
import { Fragment as Fragment7, jsx as jsx36, jsxs as jsxs21 } from "react/jsx-runtime";
function FormModal({
  // fields stuff
  fields,
  data,
  setData,
  // modal stuff
  title,
  icon,
  isOpen,
  openType,
  onClose,
  loading = false,
  // submit stuff
  onSubmit,
  id,
  endpoint,
  queryKey,
  getFinalData,
  sortBy,
  sortMode,
  submitButtonProps = {
    children: "Submit",
    icon: "tabler:check"
  },
  customUpdateDataList,
  // action button stuff
  actionButtonIcon,
  actionButtonIsRed,
  onActionButtonClick,
  // misc stuff
  namespace,
  modalRef
}) {
  const queryClient = useQueryClient();
  const [colorPickerOpen, setColorPickerOpen] = useState5(null);
  const [iconSelectorOpen, setIconSelectorOpen] = useState5(null);
  const [imagePickerModalOpen, setImagePickerModalOpen] = useState5(null);
  const [qrCodeScannerModalOpen, setQRCodeScannerModalOpen] = useState5(null);
  const [submitLoading, setSubmitLoading] = useState5(false);
  const entryCreateMutation = useModifyMutation_default("create", endpoint != null ? endpoint : "", {
    onSettled: () => {
      setSubmitLoading(false);
    },
    onSuccess: (newData) => {
      if (customUpdateDataList == null ? void 0 : customUpdateDataList.create) {
        customUpdateDataList.create(newData);
      } else {
        queryClient.setQueryData(queryKey != null ? queryKey : [], (old) => {
          return [...old, newData].sort((a, b) => {
            if (sortBy) {
              if (sortMode === "asc") {
                return a[sortBy] > b[sortBy] ? 1 : -1;
              }
              return a[sortBy] < b[sortBy] ? 1 : -1;
            }
            return 0;
          });
        });
      }
      onClose();
    }
  });
  const entryUpdateMutation = useModifyMutation_default(
    "update",
    `${endpoint}/${id}`,
    {
      onSettled: () => {
        setSubmitLoading(false);
      },
      onSuccess: (newData) => {
        if (customUpdateDataList == null ? void 0 : customUpdateDataList.update) {
          customUpdateDataList.update(newData);
        } else {
          queryClient.setQueryData(queryKey != null ? queryKey : [], (old) => {
            return old.map((entry) => {
              if (entry.id === newData.id) {
                return newData;
              }
              return entry;
            }).sort((a, b) => {
              if (sortBy) {
                if (sortMode === "asc") {
                  return a[sortBy] > b[sortBy] ? 1 : -1;
                }
                return a[sortBy] < b[sortBy] ? 1 : -1;
              }
              return 0;
            });
          });
        }
        onClose();
      }
    }
  );
  function onSubmitButtonClick() {
    return __async(this, null, function* () {
      setSubmitLoading(true);
      const finalData = getFinalData ? yield getFinalData(data) : data;
      if (openType === "create") {
        entryCreateMutation.mutate(finalData);
      } else if (openType === "update") {
        entryUpdateMutation.mutate(finalData);
      }
      if (onSubmit) {
        yield onSubmit();
        setSubmitLoading(false);
      }
    });
  }
  return /* @__PURE__ */ jsxs21(Fragment7, { children: [
    /* @__PURE__ */ jsxs21(ModalWrapper_default, { isOpen, minWidth: "50vw", modalRef, children: [
      /* @__PURE__ */ jsx36(
        ModalHeader_default,
        {
          actionButtonIcon,
          actionButtonIsRed,
          icon,
          namespace,
          title,
          onActionButtonClick,
          onClose
        }
      ),
      !loading ? /* @__PURE__ */ jsxs21(Fragment7, { children: [
        /* @__PURE__ */ jsx36(
          FormInputs_default,
          {
            data,
            fields,
            namespace,
            setColorPickerOpen,
            setData,
            setIconSelectorOpen,
            setImagePickerModalOpen,
            setQrScannerModalOpen: setQRCodeScannerModalOpen
          }
        ),
        /* @__PURE__ */ jsx36(
          SubmitButton_default,
          {
            openType,
            submitButtonProps,
            submitLoading,
            onSubmitButtonClick
          }
        )
      ] }) : /* @__PURE__ */ jsx36(LoadingScreen, {})
    ] }),
    /* @__PURE__ */ jsx36(
      PickerModals_default,
      {
        colorPickerOpen,
        data,
        fields,
        iconSelectorOpen,
        imagePickerModalOpen,
        qrScannerModalOpen: qrCodeScannerModalOpen,
        setColorPickerOpen,
        setData,
        setIconSelectorOpen,
        setImagePickerModalOpen,
        setQRScannerModalOpen: setQRCodeScannerModalOpen
      }
    )
  ] });
}
var FormModal_default = FormModal;

// src/components/modals/DeleteConfirmationModal.tsx
import { useQueryClient as useQueryClient2 } from "@tanstack/react-query";
import { useState as useState6 } from "react";
import { useTranslation as useTranslation14 } from "react-i18next";
import { toast as toast2 } from "react-toastify";
import { jsx as jsx37, jsxs as jsxs22 } from "react/jsx-runtime";
function DeleteConfirmationModal({
  itemName,
  isOpen,
  onClose,
  data,
  updateDataList,
  apiEndpoint,
  customTitle,
  customText,
  nameKey,
  customCallback,
  customConfirmButtonIcon,
  customConfirmButtonText,
  customOnClick,
  queryKey,
  multiQueryKey = false
}) {
  const { t } = useTranslation14("common.modals");
  const [loading, setLoading] = useState6(false);
  const queryClient = useQueryClient2();
  function deleteData() {
    return __async(this, null, function* () {
      var _a;
      if (data === null) return;
      setLoading(true);
      yield fetchAPI(
        `${apiEndpoint}/${!Array.isArray(data) ? (_a = data == null ? void 0 : data.id) != null ? _a : "" : ""}`,
        {
          method: "DELETE",
          body: !Array.isArray(data) ? void 0 : { ids: data }
        }
      );
      try {
        onClose();
        if (updateDataList) updateDataList();
        if (customCallback) {
          customCallback().then(() => {
            setLoading(false);
            onClose();
          }).catch(console.error);
        }
      } catch (e) {
        toast2.error(t("deleteConfirmation.error"));
      } finally {
        if (queryKey) {
          const updateFunc = (old) => {
            if (!Array.isArray(data)) {
              return old.filter((item) => item.id !== data.id);
            }
            return old.filter((item) => !data.includes(item.id));
          };
          if (multiQueryKey) {
            queryKey.forEach((key) => {
              queryClient.setQueryData(key, updateFunc);
            });
          } else {
            queryClient.setQueryData(queryKey, updateFunc);
          }
        }
        setLoading(false);
      }
    });
  }
  return /* @__PURE__ */ jsxs22(ModalWrapper_default, { isOpen, children: [
    /* @__PURE__ */ jsx37("h1", { className: "text-2xl font-semibold", children: customTitle != null ? customTitle : t("deleteConfirmation.title", {
      itemName: nameKey ? data == null ? void 0 : data[nameKey] : Array.isArray(data) ? `${data.length} ${itemName}` : `the ${itemName}`
    }) }),
    /* @__PURE__ */ jsx37("p", { className: "text-bg-500 mt-2", children: customText != null ? customText : t("deleteConfirmation.desc", { itemName }) }),
    /* @__PURE__ */ jsxs22("div", { className: "mt-6 flex w-full flex-col-reverse justify-around gap-2 sm:flex-row", children: [
      /* @__PURE__ */ jsx37(
        Button_default,
        {
          className: "w-full",
          icon: "",
          variant: "secondary",
          onClick: onClose,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx37(
        Button_default,
        {
          isRed: true,
          className: "w-full",
          icon: customConfirmButtonIcon != null ? customConfirmButtonIcon : "tabler:trash",
          loading,
          onClick: () => {
            if (customOnClick !== void 0) {
              setLoading(true);
              customOnClick().finally(() => setLoading(false));
              return;
            }
            deleteData().catch(console.error);
          },
          children: customConfirmButtonText != null ? customConfirmButtonText : "Delete"
        }
      )
    ] })
  ] });
}
var DeleteConfirmationModal_default = DeleteConfirmationModal;

// src/components/screens/CreatePasswordScreen.tsx
import { Fragment as Fragment8, jsx as jsx38, jsxs as jsxs23 } from "react/jsx-runtime";
function CreatePasswordScreen({
  endpoint
}) {
  const { t } = useTranslation15("common.vault");
  const [newPassword, setNewPassword] = useState7("");
  const [confirmPassword, setConfirmPassword] = useState7("");
  const [loading, setLoading] = useState7(false);
  const inputRef = useRef7(null);
  const inputRef2 = useRef7(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState7(false);
  function onSubmit() {
    return __async(this, null, function* () {
      if (newPassword.trim() === "" || confirmPassword.trim() === "") {
        toast3.error(t("input.error.fieldEmpty"));
        return;
      }
      if (newPassword.trim() !== confirmPassword.trim()) {
        toast3.error("Passwords do not match");
        return;
      }
      setLoading(true);
      try {
        yield fetchAPI(endpoint, {
          method: "POST",
          body: { password: newPassword }
        });
        window.location.reload();
      } catch (e) {
        toast3.error("An error occurred");
      } finally {
        setLoading(false);
        setConfirmationModalOpen(false);
      }
    });
  }
  function confirmAction() {
    if (newPassword.trim() === "" || confirmPassword.trim() === "") {
      toast3.error(t("input.error.fieldEmpty"));
      return;
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      toast3.error("Passwords do not match");
      return;
    }
    setConfirmationModalOpen(true);
  }
  return /* @__PURE__ */ jsxs23(Fragment8, { children: [
    /* @__PURE__ */ jsxs23("div", { className: "flex-center size-full flex-1 flex-col gap-4", children: [
      /* @__PURE__ */ jsx38(Icon18, { className: "size-28", icon: "tabler:lock-plus" }),
      /* @__PURE__ */ jsx38("h2", { className: "text-4xl font-semibold", children: t("vault.createPassword.title") }),
      /* @__PURE__ */ jsx38("p", { className: "text-bg-500 mb-8 w-1/2 text-center text-lg", children: t("vault.createPassword.desc") }),
      /* @__PURE__ */ jsx38(
        TextInput_default,
        {
          ref: inputRef,
          darker: true,
          isPassword: true,
          noAutoComplete: true,
          actionButtonIcon: "tabler:dice",
          className: "w-1/2",
          icon: "tabler:lock",
          name: "New Password",
          namespace: "common.vault",
          placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
          setValue: setNewPassword,
          tKey: "vault",
          value: newPassword,
          onActionButtonClick: () => {
            const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const lowerCase = "abcdefghijklmnopqrstuvwxyz";
            const special = "!@#$%^&*()_+";
            const numbers = "0123456789";
            const all = upperCase + lowerCase + numbers + special;
            let password = "";
            for (let i = 0; i < 12; i++) {
              password += all[Math.floor(Math.random() * all.length)];
            }
            setNewPassword(password);
            setConfirmPassword(password);
            toast3.success("Random password generated successfully");
          }
        },
        "newPassword"
      ),
      /* @__PURE__ */ jsx38(
        TextInput_default,
        {
          ref: inputRef2,
          darker: true,
          isPassword: true,
          noAutoComplete: true,
          className: "w-1/2",
          icon: "tabler:lock-check",
          name: "Confirm Password",
          namespace: "common.vault",
          placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
          setValue: setConfirmPassword,
          tKey: "vault",
          value: confirmPassword,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              confirmAction();
            }
          }
        },
        "confirmPassword"
      ),
      /* @__PURE__ */ jsx38(
        Button_default,
        {
          className: "w-1/2",
          icon: "tabler:check",
          loading,
          onClick: confirmAction,
          children: "Submit"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs23(ModalWrapper_default, { isOpen: confirmationModalOpen, children: [
      /* @__PURE__ */ jsx38("h1", { className: "text-2xl font-semibold", children: "Make sure you remember your master password!" }),
      /* @__PURE__ */ jsx38("p", { className: "text-bg-500 mt-2", children: "This master password is unchangable for now! If you accidentally forget the password, you lose everything. This password is hashed and stored in your user profile, and it is not decryptable. It will be used to encrypt and decrypt the data you store in your vault." }),
      /* @__PURE__ */ jsxs23("div", { className: "mt-6 flex w-full justify-around gap-2", children: [
        /* @__PURE__ */ jsx38(
          Button_default,
          {
            className: "w-full",
            icon: "",
            variant: "secondary",
            onClick: () => {
              setConfirmationModalOpen(false);
            },
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsx38(
          Button_default,
          {
            className: "w-full",
            icon: "tabler:check",
            loading,
            onClick: () => {
              onSubmit().catch(console.error);
            },
            children: !loading ? "Confirm" : ""
          }
        )
      ] })
    ] })
  ] });
}
var CreatePasswordScreen_default = CreatePasswordScreen;

// src/components/screens/EmptyStateScreen.tsx
import { Icon as Icon19 } from "@iconify/react";
import clsx21 from "clsx";
import { useTranslation as useTranslation16 } from "react-i18next";
import { jsx as jsx39, jsxs as jsxs24 } from "react/jsx-runtime";
function EmptyStateScreen({
  onCTAClick,
  name,
  title,
  description,
  icon,
  ctaContent,
  ctaTProps,
  ctaIcon,
  customCTAButton,
  smaller = false,
  namespace,
  tKey = ""
}) {
  const { t } = useTranslation16(namespace ? namespace : void 0);
  return /* @__PURE__ */ jsxs24(
    "div",
    {
      className: clsx21(
        "flex-center size-full flex-col",
        smaller ? "gap-4" : "gap-6"
      ),
      children: [
        icon !== void 0 && (typeof icon === "string" ? /* @__PURE__ */ jsx39(
          Icon19,
          {
            className: clsx21(
              "text-bg-300 dark:text-bg-500 shrink-0",
              smaller ? "size-24" : "size-32"
            ),
            icon
          }
        ) : icon),
        /* @__PURE__ */ jsx39(
          "h2",
          {
            className: clsx21(
              "text-bg-500 px-6 text-center font-semibold",
              smaller ? "text-3xl" : "text-4xl"
            ),
            children: name ? t([tKey, "empty", name, "title"].filter((e) => e).join(".")) : title
          }
        ),
        /* @__PURE__ */ jsx39(
          "p",
          {
            className: clsx21(
              "text-bg-500 -mt-2 px-6 text-center whitespace-pre-wrap",
              smaller ? "text-base" : "text-lg"
            ),
            children: name ? t([tKey, "empty", name, "description"].filter((e) => e).join(".")) : description
          }
        ),
        customCTAButton != null ? customCTAButton : ctaContent && onCTAClick && /* @__PURE__ */ jsx39(
          Button_default,
          {
            className: "mt-6",
            icon: ctaIcon != null ? ctaIcon : "tabler:plus",
            tProps: ctaTProps,
            onClick: () => {
              onCTAClick("create");
            },
            children: ctaContent
          }
        )
      ]
    }
  );
}
var EmptyStateScreen_default = EmptyStateScreen;

// src/components/screens/LockedScreen.tsx
import { Icon as Icon20 } from "@iconify/react";
import { useState as useState8 } from "react";
import { useTranslation as useTranslation17 } from "react-i18next";
import { toast as toast4 } from "react-toastify";

// src/utils/encryption.ts
import CryptoJS from "crypto-js";
var encrypt = (text, key) => {
  return CryptoJS.AES.encrypt(text, key).toString();
};

// src/components/screens/LockedScreen.tsx
import { jsx as jsx40, jsxs as jsxs25 } from "react/jsx-runtime";
function LockedScreen({
  endpoint,
  setMasterPassword
}) {
  const [masterPassWordInputContent, setMasterPassWordInputContent] = useState8("");
  const [loading, setLoading] = useState8(false);
  const { t } = useTranslation17("common.vault");
  function onSubmit() {
    return __async(this, null, function* () {
      if (masterPassWordInputContent.trim() === "") {
        toast4.error("Please fill in all the field");
        return;
      }
      setLoading(true);
      try {
        const challenge = yield fetchAPI(`${endpoint}/challenge`);
        const data = yield fetchAPI(`${endpoint}/verify`, {
          method: "POST",
          body: {
            password: encrypt(masterPassWordInputContent, challenge)
          }
        });
        if (data === true) {
          toast4.info(
            t("fetch.success", {
              action: t("fetch.unlock")
            })
          );
          setMasterPassword(masterPassWordInputContent);
          setMasterPassWordInputContent("");
        } else {
          toast4.error(
            t("fetch.failure", {
              action: t("fetch.unlock")
            })
          );
        }
      } catch (e) {
        toast4.error(
          t("fetch.failure", {
            action: t("fetch.unlock")
          })
        );
      } finally {
        setLoading(false);
      }
    });
  }
  return /* @__PURE__ */ jsxs25("div", { className: "flex-center size-full flex-1 flex-col gap-4", children: [
    /* @__PURE__ */ jsx40(Icon20, { className: "size-28", icon: "tabler:lock-access" }),
    /* @__PURE__ */ jsx40("h2", { className: "text-4xl font-semibold", children: t(`vault.lockedMessage`) }),
    /* @__PURE__ */ jsx40("p", { className: "text-bg-500 mb-8 text-center text-lg", children: t(`vault.passwordRequired`) }),
    /* @__PURE__ */ jsx40(
      TextInput_default,
      {
        darker: true,
        isPassword: true,
        noAutoComplete: true,
        className: "w-full md:w-3/4 xl:w-1/2",
        icon: "tabler:lock",
        name: "Master Password",
        namespace: "common.vault",
        placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
        setValue: setMasterPassWordInputContent,
        tKey: "vault",
        value: masterPassWordInputContent,
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            onSubmit().catch(console.error);
          }
        }
      }
    ),
    /* @__PURE__ */ jsx40(
      Button_default,
      {
        className: "w-full md:w-3/4 xl:w-1/2",
        icon: "tabler:lock",
        loading,
        namespace: "common.vault",
        tKey: "vault",
        onClick: () => {
          onSubmit().catch(console.error);
        },
        children: "Unlock"
      }
    )
  ] });
}
var LockedScreen_default = LockedScreen;

// src/components/screens/NotFoundScreen.tsx
import { useTranslation as useTranslation18 } from "react-i18next";
import { Link } from "react-router";
import { jsx as jsx41, jsxs as jsxs26 } from "react/jsx-runtime";
function NotFoundScreen() {
  const { t } = useTranslation18("common.misc");
  return /* @__PURE__ */ jsxs26("div", { className: "flex-center w-full flex-col gap-6", children: [
    /* @__PURE__ */ jsx41("span", { className: "text-custom-500 text-[10rem]", children: ";-;" }),
    /* @__PURE__ */ jsx41("h1", { className: "text-4xl font-semibold", children: t("notFound.title") }),
    /* @__PURE__ */ jsx41("p", { className: "text-bg-500 text-xl", children: t("notFound.description") }),
    /* @__PURE__ */ jsxs26("div", { className: "flex-center mt-6 gap-4", children: [
      /* @__PURE__ */ jsx41(Button_default, { as: Link, icon: "tabler:arrow-left", to: "/", children: t("buttons.goBack") }),
      /* @__PURE__ */ jsx41(
        Button_default,
        {
          as: "a",
          href: "https://github.com/Lifeforge-app/lifeforge/issues",
          icon: "tabler:bug",
          rel: "noopener noreferrer",
          target: "_blank",
          variant: "secondary",
          children: t("buttons.reportBug")
        }
      )
    ] })
  ] });
}
var NotFoundScreen_default = NotFoundScreen;

// src/components/screens/MissingAPIKeyScreen.tsx
import { Icon as Icon21 } from "@iconify/react";
import { useTranslation as useTranslation19 } from "react-i18next";
import { Link as Link2 } from "react-router";
import { jsx as jsx42, jsxs as jsxs27 } from "react/jsx-runtime";
function MissingAPIKeyScreen({
  requiredAPIKeys
}) {
  const { t } = useTranslation19("modules.apiKeys");
  return /* @__PURE__ */ jsxs27("div", { className: "flex-center size-full flex-1 flex-col gap-4", children: [
    /* @__PURE__ */ jsx42(Icon21, { className: "size-28", icon: "tabler:key-off" }),
    /* @__PURE__ */ jsx42("h2", { className: "text-4xl font-semibold", children: t("missing.title") }),
    /* @__PURE__ */ jsx42("p", { className: "text-bg-500 text-center text-lg", children: t("missing.description") }),
    /* @__PURE__ */ jsxs27("p", { className: "text-bg-500 mt-4 mb-8 text-center text-lg", children: [
      t("missing.requiredKeysAre"),
      " ",
      /* @__PURE__ */ jsx42("code", { children: requiredAPIKeys.join(", ") })
    ] }),
    /* @__PURE__ */ jsx42(Button_default, { iconAtEnd: true, as: Link2, icon: "tabler:arrow-right", to: "/api-keys", children: "Config API Keys" })
  ] });
}
var MissingAPIKeyScreen_default = MissingAPIKeyScreen;

// src/components/screens/OTPScreen.tsx
import { Icon as Icon22 } from "@iconify/react";
import { useEffect as useEffect3, useState as useState9 } from "react";
import { useTranslation as useTranslation20 } from "react-i18next";
import OtpInput from "react-otp-input";
import { toast as toast5 } from "react-toastify";
import { Fragment as Fragment9, jsx as jsx43, jsxs as jsxs28 } from "react/jsx-runtime";
function OTPInputBox({
  verityOTP,
  verifyOtpLoading
}) {
  const [otp, setOtp] = useState9("");
  return /* @__PURE__ */ jsxs28(Fragment9, { children: [
    /* @__PURE__ */ jsx43(
      OtpInput,
      {
        shouldAutoFocus: true,
        numInputs: 6,
        renderInput: (props) => /* @__PURE__ */ jsx43(
          "input",
          __spreadProps(__spreadValues({}, props), {
            className: "border-bg-200 bg-bg-50 text-bg-800 shadow-custom dark:border-bg-800 dark:bg-bg-900 dark:text-bg-200 mx-2 size-12! rounded-md border-[1.5px] text-lg md:size-16! md:text-2xl",
            inputMode: "numeric",
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                verityOTP(otp).catch((err) => {
                  console.error(err);
                });
              }
            }
          })
        ),
        value: otp,
        onChange: setOtp
      }
    ),
    /* @__PURE__ */ jsx43(
      Button_default,
      {
        iconAtEnd: true,
        className: "mt-6 w-full md:w-3/4 xl:w-1/2",
        icon: "tabler:arrow-right",
        loading: verifyOtpLoading,
        namespace: "common.vault",
        tKey: "otp",
        onClick: () => {
          verityOTP(otp).catch((err) => {
            console.error(err);
          });
        },
        children: "verify"
      }
    )
  ] });
}
function ResendOTPButton({
  otpCooldown,
  sendOtpLoading,
  requestOTP
}) {
  const { t } = useTranslation20("common.vault");
  return /* @__PURE__ */ jsxs28(
    Button_default,
    {
      className: "w-full md:w-3/4 xl:w-1/2",
      disabled: otpCooldown > 0,
      icon: "tabler:refresh",
      loading: sendOtpLoading,
      variant: "secondary",
      onClick: requestOTP,
      children: [
        t("otp.buttons.resend"),
        " ",
        otpCooldown > 0 && `(${otpCooldown}s)`
      ]
    }
  );
}
function OTPScreen({
  endpoint,
  callback
}) {
  var _a;
  const { t } = useTranslation20("common.vault");
  const [otpSent, setOtpSent] = useState9(false);
  const [otpId, setOtpId] = useState9((_a = localStorage.getItem("otpId")) != null ? _a : "");
  const [otpCooldown, setOtpCooldown] = useState9(
    localStorage.getItem("otpCooldown") ? Math.floor(
      (Number(localStorage.getItem("otpCooldown")) - (/* @__PURE__ */ new Date()).getTime()) / 1e3
    ) : 0
  );
  const [sendOtpLoading, setSendOtpLoading] = useState9(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState9(false);
  function requestOTP() {
    return __async(this, null, function* () {
      if (otpCooldown > 0) {
        toast5.error(t("otp.messages.cooldown"));
        return;
      }
      setSendOtpLoading(true);
      try {
        const data = yield fetchAPI("user/auth/otp", {
          method: "GET"
        });
        setOtpSent(true);
        setOtpId(data);
        setOtpCooldown(60);
        const coolDown = (/* @__PURE__ */ new Date()).getTime() + 6e4;
        localStorage.setItem("otpCooldown", coolDown.toString());
        toast5.success(t("otp.messages.success"));
      } catch (e) {
        toast5.error(t("otp.messages.failed"));
      } finally {
        setSendOtpLoading(false);
      }
    });
  }
  function verityOTP(otp) {
    return __async(this, null, function* () {
      if (otp.length !== 6) {
        toast5.error(t("otp.messages.invalid"));
        return;
      }
      setVerifyOtpLoading(true);
      try {
        const challenge = yield fetchAPI(`${endpoint}/challenge`);
        const data = yield fetchAPI(`${endpoint}/otp`, {
          method: "POST",
          body: {
            otp: encrypt(otp, challenge),
            otpId
          }
        });
        if (data) {
          callback();
          localStorage.removeItem("otpCooldown");
          toast5.success(t("otp.messages.verify.success"));
        } else {
          toast5.error(t("otp.messages.verify.failed"));
        }
      } catch (e) {
        toast5.error(t("otp.messages.verify.failed"));
      } finally {
        setVerifyOtpLoading(false);
      }
    });
  }
  useEffect3(() => {
    if (otpCooldown > 0) {
      setOtpSent(true);
      const interval = setInterval(() => {
        setOtpCooldown((prev) => prev - 1);
        if (otpCooldown === 0) {
          setOtpSent(false);
          clearInterval(interval);
        }
      }, 1e3);
      return () => {
        clearInterval(interval);
      };
    }
  }, [otpCooldown, otpSent]);
  return /* @__PURE__ */ jsxs28("div", { className: "flex-center size-full flex-1 flex-col gap-4", children: [
    /* @__PURE__ */ jsx43(Icon22, { className: "size-28", icon: "tabler:shield-lock" }),
    /* @__PURE__ */ jsx43("h2", { className: "text-center text-4xl font-semibold", children: t("otp.messages.required.title") }),
    /* @__PURE__ */ jsx43("p", { className: "text-bg-500 mb-8 text-center text-lg", children: t("otp.messages.required.desc") }),
    otpSent ? /* @__PURE__ */ jsxs28(Fragment9, { children: [
      /* @__PURE__ */ jsx43(
        OTPInputBox,
        {
          verifyOtpLoading,
          verityOTP
        }
      ),
      /* @__PURE__ */ jsx43(
        ResendOTPButton,
        {
          otpCooldown,
          requestOTP,
          sendOtpLoading
        }
      )
    ] }) : /* @__PURE__ */ jsx43(
      Button_default,
      {
        className: "w-full md:w-3/4 xl:w-1/2",
        icon: "tabler:mail",
        loading: sendOtpLoading,
        namespace: "common.vault",
        tKey: "otp",
        onClick: requestOTP,
        children: "Request"
      }
    )
  ] });
}
var OTPScreen_default = OTPScreen;

// src/components/screens/QueryWrapper.tsx
import { Fragment as Fragment10, jsx as jsx44 } from "react/jsx-runtime";
function QueryWrapper({
  query,
  children,
  showLoading = true
}) {
  if (query.isLoading) {
    return showLoading ? /* @__PURE__ */ jsx44(LoadingScreen, {}) : /* @__PURE__ */ jsx44(Fragment10, {});
  }
  if (query.isError || query.data === void 0) {
    return /* @__PURE__ */ jsx44(ErrorScreen_default, { message: "Failed to fetch data from server." });
  }
  return /* @__PURE__ */ jsx44(Fragment10, { children: children(query.data) });
}
var QueryWrapper_default = QueryWrapper;

// src/hooks/useFetch.ts
import { cookieParse as cookieParse2 } from "pocketbase";
import { useEffect as useEffect4, useState as useState10 } from "react";
import { toast as toast6 } from "react-toastify";
function useFetch(endpoint, criteriaMet = true, method = "GET", body = {}, changeStateWhenLoading = true, showError = true) {
  const { apiHost } = useLifeforgeUIContext();
  const [data, setData] = useState10("loading");
  function fetchData() {
    if (changeStateWhenLoading) {
      setData("loading");
    }
    fetch(`${apiHost}/${endpoint}`, {
      method,
      body: method === "POST" ? JSON.stringify(body) : void 0,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieParse2(document.cookie).token}`
      }
    }).then((res) => __async(this, null, function* () {
      try {
        const data2 = yield res.json();
        if (!res.ok || data2.state !== "success") {
          throw new Error(JSON.stringify(data2.message));
        }
        setData(data2.data);
      } catch (err) {
        throw new Error(err);
      }
    })).catch((err) => {
      setData("error");
      if (showError) {
        toast6.error("fetch.fetchError " + err);
      }
      console.error(err);
    });
  }
  useEffect4(() => {
    if (criteriaMet) {
      fetchData();
    }
  }, [endpoint, criteriaMet]);
  return [data, fetchData, setData];
}
var useFetch_default = useFetch;

// src/components/inputs/LocationInput.tsx
import { Fragment as Fragment11, jsx as jsx45 } from "react/jsx-runtime";
function LocationInput({
  location,
  setLocation,
  namespace,
  label
}) {
  const { googleAPIKey: apiKey } = useLifeforgeUIContext();
  const [query, setQuery] = useState11("");
  const debouncedQuery = useDebounce2(query, 500);
  const [data, , setData] = useFetch_default(
    `/locations?q=${debouncedQuery}&key=${apiKey}`,
    debouncedQuery.trim() !== ""
  );
  useEffect5(() => {
    if (query.trim() === "") {
      setData("loading");
    }
  }, [query]);
  return /* @__PURE__ */ jsx45(
    ListboxOrComboboxInput_default,
    {
      customActive: Boolean(location),
      displayValue: (value) => value,
      icon: "tabler:map-pin",
      name: label || "Location",
      namespace,
      setQuery,
      setValue: setLocation,
      type: "combobox",
      value: location,
      children: query.trim() !== "" && /* @__PURE__ */ jsx45(APIFallbackComponent_default, { data, children: (data2) => /* @__PURE__ */ jsx45(Fragment11, { children: data2.predictions.map((prediction) => /* @__PURE__ */ jsx45(
        ListboxOrComboboxOption_default,
        {
          matchedSubstrings: prediction.matched_substrings,
          text: prediction.description,
          type: "combobox",
          value: prediction.description
        },
        prediction.place_id
      )) }) })
    }
  );
}
var LocationInput_default = LocationInput;

// src/components/inputs/ListboxOrComboboxInput/components/ListboxOrComboboxOption.tsx
import {
  ListboxOption as HeadlessListboxOption,
  ComboboxOption as HeadlessComboboxOption
} from "@headlessui/react";
import { Icon as Icon23 } from "@iconify/react";
import clsx22 from "clsx";
import { Fragment as Fragment12, jsx as jsx46, jsxs as jsxs29 } from "react/jsx-runtime";
function ListboxOrComboboxOption({
  value,
  text,
  icon,
  iconAtEnd = false,
  color,
  type = "listbox",
  matchedSubstrings,
  noCheckmark = false
}) {
  const Element = type === "listbox" ? HeadlessListboxOption : HeadlessComboboxOption;
  const getCharClassNames = (matchedSubstrings2, index) => {
    if (matchedSubstrings2 === void 0 || !matchedSubstrings2.some(
      ({ offset, length }) => index >= offset && index < offset + length
    ))
      return "";
    return "font-medium text-bg-800 dark:text-bg-100";
  };
  return /* @__PURE__ */ jsx46(
    Element,
    {
      className: "flex-between hover:bg-bg-200 dark:hover:bg-bg-700/50 relative flex cursor-pointer gap-8 p-4 transition-all select-none",
      value,
      children: ({ selected }) => /* @__PURE__ */ jsxs29(Fragment12, { children: [
        /* @__PURE__ */ jsxs29(
          "div",
          {
            className: clsx22(
              "flex w-full items-center",
              color !== void 0 ? "gap-3" : "gap-2",
              selected && "text-bg-800 dark:text-bg-100 font-semibold",
              iconAtEnd && "flex-between flex flex-row-reverse"
            ),
            children: [
              icon !== void 0 ? /* @__PURE__ */ jsx46(
                "span",
                {
                  className: clsx22("rounded-md", color ? "p-2" : "pr-2"),
                  style: color !== void 0 ? {
                    backgroundColor: color + "20",
                    color
                  } : {},
                  children: typeof icon === "string" ? /* @__PURE__ */ jsx46(Icon23, { className: "size-5", icon }) : icon
                }
              ) : color !== void 0 && /* @__PURE__ */ jsx46(
                "span",
                {
                  className: "border-bg-200 dark:border-bg-700 block size-4 rounded-full border",
                  style: { backgroundColor: color }
                }
              ),
              /* @__PURE__ */ jsx46("span", { children: text.split("").map((char, index) => /* @__PURE__ */ jsx46(
                "span",
                {
                  className: getCharClassNames(matchedSubstrings, index),
                  children: char
                },
                index
              )) })
            ]
          }
        ),
        !noCheckmark && selected && /* @__PURE__ */ jsx46(
          Icon23,
          {
            className: "text-custom-500 block shrink-0 text-lg",
            icon: "tabler:check"
          }
        )
      ] })
    }
  );
}
var ListboxOrComboboxOption_default = ListboxOrComboboxOption;

// src/components/inputs/ListboxOrComboboxInput/components/ListboxNullOption.tsx
import { ListboxOption } from "@headlessui/react";
import { Icon as Icon24 } from "@iconify/react";
import clsx23 from "clsx";
import { Fragment as Fragment13, jsx as jsx47, jsxs as jsxs30 } from "react/jsx-runtime";
function ListboxNullOption({
  icon,
  value = "",
  hasBgColor = false,
  text = "None"
}) {
  return /* @__PURE__ */ jsx47(
    ListboxOption,
    {
      className: "flex-between hover:bg-bg-200 dark:hover:bg-bg-700/50 relative flex cursor-pointer p-4 transition-all select-none",
      value,
      children: ({ selected }) => /* @__PURE__ */ jsxs30(Fragment13, { children: [
        /* @__PURE__ */ jsxs30(
          "div",
          {
            className: clsx23(
              "flex items-center font-medium",
              hasBgColor ? "gap-4" : "gap-2",
              selected && "text-bg-800 dark:text-bg-100"
            ),
            children: [
              /* @__PURE__ */ jsx47(
                "span",
                {
                  className: clsx23(
                    "rounded-md",
                    hasBgColor ? "bg-bg-200 text-bg-500 dark:bg-bg-700/50 p-2" : "pr-2"
                  ),
                  children: /* @__PURE__ */ jsx47(Icon24, { className: "size-5", icon })
                }
              ),
              /* @__PURE__ */ jsx47("span", { children: text })
            ]
          }
        ),
        selected && /* @__PURE__ */ jsx47(
          Icon24,
          {
            className: "text-custom-500 block text-lg",
            icon: "tabler:check"
          }
        )
      ] })
    },
    "none"
  );
}
var ListboxNullOption_default = ListboxNullOption;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/index.tsx
import { useEffect as useEffect7, useReducer, useState as useState13 } from "react";
import { useTranslation as useTranslation24 } from "react-i18next";

// src/components/utilities/HeaderFilter/index.tsx
import { useMemo as useMemo4 } from "react";
import { useSearchParams } from "react-router";

// src/components/utilities/HeaderFilter/components/HeaderFilterChip.tsx
import { Icon as Icon25 } from "@iconify/react";
import clsx24 from "clsx";
import { jsx as jsx48, jsxs as jsxs31 } from "react/jsx-runtime";
function FilterChip({
  icon,
  text,
  color,
  onRemove
}) {
  const { componentBgLighter } = useThemeColors();
  return /* @__PURE__ */ jsxs31(
    "span",
    {
      className: clsx24(
        "flex-center gap-1 rounded-full px-2 py-1 text-sm",
        color === void 0 && `text-bg-500 dark:text-bg-400 ${componentBgLighter}`
      ),
      style: color !== void 0 ? { backgroundColor: color + "20", color } : {},
      children: [
        /* @__PURE__ */ jsx48(Icon25, { className: "size-4", icon }),
        text,
        /* @__PURE__ */ jsx48("button", { onClick: onRemove, children: /* @__PURE__ */ jsx48(Icon25, { className: "size-4", icon: "tabler:x" }) })
      ]
    }
  );
}
var HeaderFilterChip_default = FilterChip;

// src/components/utilities/HeaderFilter/index.tsx
import { Fragment as Fragment14, jsx as jsx49 } from "react/jsx-runtime";
function HeaderFilter({
  items
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useThemeColors();
  const themeColorHex = useMemo4(() => {
    var _a, _b;
    if (theme.startsWith("#")) {
      return theme;
    }
    const [r, g, b] = (_b = (_a = theme.match(/\((\d+), (\d+), (\d+)\)/)) == null ? void 0 : _a.slice(1)) != null ? _b : [];
    return rgbToHex(Number(r), Number(g), Number(b));
  }, [theme]);
  if (!(Object.values(items).every(({ data }) => typeof data !== "string") && Object.keys(items).some((query) => Boolean(searchParams.get(query))))) {
    return /* @__PURE__ */ jsx49(Fragment14, {});
  }
  return /* @__PURE__ */ jsx49("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: Object.entries(items).map(([query, { data, isColored }]) => {
    return typeof data !== "string" && Boolean(searchParams.get(query)) ? (() => {
      var _a, _b, _c;
      const target = data.find(
        (item) => item.id === searchParams.get(query)
      );
      if (target === void 0) {
        return null;
      }
      return /* @__PURE__ */ jsx49(
        HeaderFilterChip_default,
        {
          color: isColored === true ? (_a = target.color) != null ? _a : themeColorHex : void 0,
          icon: (_b = target.icon) != null ? _b : "",
          text: (_c = target.name) != null ? _c : "",
          onRemove: () => {
            searchParams.delete(query);
            setSearchParams(searchParams);
          }
        },
        query
      );
    })() : null;
  }) });
}
var HeaderFilter_default = HeaderFilter;

// src/components/utilities/ConfigColumn.tsx
import { Icon as Icon26 } from "@iconify/react";
import clsx25 from "clsx";
import _14 from "lodash";
import { useEffect as useEffect6, useRef as useRef8 } from "react";
import { Tooltip } from "react-tooltip";
import { Fragment as Fragment15, jsx as jsx50, jsxs as jsxs32 } from "react/jsx-runtime";
function ConfigColumn({
  title,
  desc,
  icon,
  vertical = false,
  tooltip,
  hasDivider = true,
  children,
  wrapWhen = "md",
  noDefaultBreakpoints = false,
  className
}) {
  var _a, _b;
  const ref = useRef8(null);
  useEffect6(() => {
    if (!ref.current) return;
    ref.current.getBoundingClientRect();
  }, [ref]);
  return /* @__PURE__ */ jsxs32(Fragment15, { children: [
    /* @__PURE__ */ jsxs32(
      "div",
      {
        ref,
        className: clsx25(
          "flex w-full min-w-0 flex-col justify-between gap-8 px-4",
          !vertical && !noDefaultBreakpoints && {
            sm: "sm:flex-row",
            md: "md:flex-row",
            lg: "lg:flex-row",
            xl: "xl:flex-row"
          }[wrapWhen],
          vertical && "flex-col",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs32("div", { className: "flex shrink items-center gap-4", children: [
            /* @__PURE__ */ jsx50(Icon26, { className: "text-bg-500 size-6 shrink-0", icon }),
            /* @__PURE__ */ jsxs32("div", { children: [
              /* @__PURE__ */ jsxs32("h3", { className: "flex w-full items-center gap-2 text-xl leading-normal font-medium md:w-auto", children: [
                title,
                tooltip !== void 0 && /* @__PURE__ */ jsx50(
                  "span",
                  {
                    "data-tooltip-id": `tooltip-${_14.kebabCase(
                      (_a = title == null ? void 0 : title.toString()) != null ? _a : ""
                    )}`,
                    children: /* @__PURE__ */ jsx50(
                      Icon26,
                      {
                        className: "text-bg-500 size-5",
                        icon: "tabler:info-circle"
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsx50("p", { className: "text-bg-500", children: desc })
            ] })
          ] }),
          /* @__PURE__ */ jsx50("div", { className: "flex w-full min-w-0 shrink-0 items-center gap-4 md:w-auto", children }),
          tooltip !== void 0 && /* @__PURE__ */ jsx50(
            Tooltip,
            {
              className: "bg-bg-50 text-bg-800 shadow-custom dark:bg-bg-900 dark:text-bg-50 z-9999 rounded-md! p-4! text-base!",
              classNameArrow: "size-6!",
              id: `tooltip-${_14.kebabCase((_b = title == null ? void 0 : title.toString()) != null ? _b : "")}`,
              opacity: 1,
              place: "top-start",
              positionStrategy: "fixed",
              children: tooltip
            }
          )
        ]
      }
    ),
    hasDivider && /* @__PURE__ */ jsx50("div", { className: "border-bg-200 dark:border-bg-800/50 my-6 w-full border-b-[1.5px]" })
  ] });
}
var ConfigColumn_default = ConfigColumn;

// src/components/utilities/Pagination.tsx
import { Icon as Icon27 } from "@iconify/react";
import clsx26 from "clsx";
import { Fragment as Fragment16, jsx as jsx51, jsxs as jsxs33 } from "react/jsx-runtime";
function Pagination({
  currentPage,
  onPageChange,
  totalPages,
  className = ""
}) {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const pagesToShow = 5;
    const startPage = Math.max(
      (() => {
        if (currentPage > totalPages - pagesToShow) {
          return totalPages - pagesToShow + 1;
        }
        if (currentPage < pagesToShow) {
          return 1;
        }
        return currentPage - Math.floor(pagesToShow / 2);
      })(),
      1
    );
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    if (startPage > 2) {
      pageNumbers.push(
        /* @__PURE__ */ jsxs33(Fragment16, { children: [
          /* @__PURE__ */ jsx51(
            "button",
            {
              className: clsx26(
                "hidden rounded-md px-3 py-2 lg:block",
                currentPage === 1 ? "text-custom-500 font-semibold" : "text-bg-500 hover:bg-bg-200 dark:hover:bg-bg-800"
              ),
              onClick: () => {
                onPageChange(1);
              },
              children: 1
            },
            1
          ),
          /* @__PURE__ */ jsx51(Icon27, { className: "text-bg-500 hidden lg:block", icon: "uil:ellipsis-h" })
        ] })
      );
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        /* @__PURE__ */ jsxs33(
          "button",
          {
            className: clsx26(
              "rounded-md px-5 py-3",
              currentPage === i ? "lg:text-custom-500 font-semibold" : "text-bg-500 hover:bg-bg-200 dark:hover:bg-bg-800 hidden lg:block"
            ),
            onClick: () => {
              onPageChange(i);
            },
            children: [
              /* @__PURE__ */ jsx51("span", { className: "inline lg:hidden", children: "Page " }),
              i,
              /* @__PURE__ */ jsxs33("span", { className: "inline lg:hidden", children: [
                " / ",
                totalPages
              ] })
            ]
          },
          i
        )
      );
    }
    if (endPage < totalPages) {
      pageNumbers.push(
        /* @__PURE__ */ jsxs33(Fragment16, { children: [
          endPage < totalPages - 1 && /* @__PURE__ */ jsx51(
            Icon27,
            {
              className: "text-bg-500 hidden lg:block",
              icon: "uil:ellipsis-h"
            }
          ),
          /* @__PURE__ */ jsx51(
            "button",
            {
              className: clsx26(
                "hidden rounded-md px-5 py-3 lg:block",
                currentPage === totalPages ? "text-custom-500 font-semibold" : "text-bg-500 hover:bg-bg-200 dark:hover:bg-bg-800"
              ),
              onClick: () => {
                onPageChange(totalPages);
              },
              children: totalPages
            },
            totalPages
          )
        ] })
      );
    }
    return pageNumbers;
  };
  return /* @__PURE__ */ jsxs33("div", { className: clsx26("flex-between flex gap-2", className), children: [
    currentPage !== 1 ? /* @__PURE__ */ jsxs33(Fragment16, { children: [
      /* @__PURE__ */ jsx51(
        Button_default,
        {
          className: clsx26("hidden w-32 sm:flex"),
          disabled: currentPage === 1,
          icon: "uil:angle-left",
          variant: "no-bg",
          onClick: () => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          },
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsx51(
        Button_default,
        {
          className: clsx26("w-12 sm:hidden"),
          icon: "uil:angle-left",
          variant: "no-bg",
          onClick: () => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }
        }
      )
    ] }) : /* @__PURE__ */ jsx51("span", { className: "w-12 sm:w-32" }),
    /* @__PURE__ */ jsx51("div", { className: "flex items-center gap-2", children: renderPageNumbers() }),
    currentPage < totalPages ? /* @__PURE__ */ jsxs33(Fragment16, { children: [
      /* @__PURE__ */ jsx51(
        Button_default,
        {
          iconAtEnd: true,
          className: clsx26("w-12 sm:hidden"),
          icon: "uil:angle-right",
          variant: "no-bg",
          onClick: () => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }
        }
      ),
      /* @__PURE__ */ jsx51(
        Button_default,
        {
          iconAtEnd: true,
          className: clsx26("hidden w-32 sm:flex"),
          disabled: currentPage === totalPages,
          icon: "uil:angle-right",
          variant: "no-bg",
          onClick: () => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          },
          children: "Next"
        }
      )
    ] }) : /* @__PURE__ */ jsx51("span", { className: "w-12 sm:w-32" })
  ] });
}
var Pagination_default = Pagination;

// src/components/utilities/Scrollbar.tsx
import { Scrollbars } from "react-custom-scrollbars";
import { jsx as jsx52 } from "react/jsx-runtime";
function Scrollbar(_a) {
  var _b = _a, {
    children
  } = _b, props = __objRest(_b, [
    "children"
  ]);
  return /* @__PURE__ */ jsx52(
    Scrollbars,
    __spreadProps(__spreadValues({}, props), {
      autoHide: true,
      autoHideDuration: 200,
      renderThumbVertical: (props2) => /* @__PURE__ */ jsx52("div", __spreadProps(__spreadValues({}, props2), { className: "bg-bg-300 dark:bg-bg-800 rounded-lg" })),
      renderView: (props2) => /* @__PURE__ */ jsx52("div", __spreadProps(__spreadValues({}, props2), { className: "flex min-h-0 flex-1 flex-col" })),
      children
    })
  );
}
var Scrollbar_default = Scrollbar;

// src/components/utilities/Tabs.tsx
import { Icon as Icon28 } from "@iconify/react";
import clsx27 from "clsx";
import { jsx as jsx53, jsxs as jsxs34 } from "react/jsx-runtime";
function Tabs({
  items,
  enabled,
  active,
  onNavClick,
  className
}) {
  return /* @__PURE__ */ jsx53("div", { className: "mb-6 flex items-center", children: items.filter(({ id }) => enabled.includes(id)).map(({ name, icon, id }) => {
    var _a, _b;
    return /* @__PURE__ */ jsxs34(
      "button",
      {
        className: clsx27(
          "flex w-full min-w-0 cursor-pointer items-center justify-center gap-2 border-b-2 p-4 tracking-widest uppercase transition-all",
          active === id ? "border-custom-500 text-custom-500 font-medium" : "border-bg-400 text-bg-400 hover:border-bg-800 hover:text-bg-800 dark:border-bg-500 dark:text-bg-500 dark:hover:border-bg-200 dark:hover:text-bg-200",
          className
        ),
        onClick: () => {
          onNavClick(id);
        },
        children: [
          /* @__PURE__ */ jsx53(Icon28, { className: "size-5 shrink-0", icon }),
          /* @__PURE__ */ jsx53("span", { className: "truncate sm:block", children: name }),
          ((_a = items.find((item) => item.name === name)) == null ? void 0 : _a.amount) !== void 0 && /* @__PURE__ */ jsxs34("span", { className: "hidden text-sm sm:block", children: [
            "(",
            (_b = items.find((item) => item.name === name)) == null ? void 0 : _b.amount,
            ")"
          ] })
        ]
      },
      id
    );
  }) });
}
var Tabs_default = Tabs;

// src/components/utilities/ViewModeSelector.tsx
import { Icon as Icon29 } from "@iconify/react";
import clsx28 from "clsx";
import { jsx as jsx54 } from "react/jsx-runtime";
function ViewModeSelector({
  viewMode,
  setViewMode,
  options,
  className
}) {
  const { componentBg, componentBgLighter } = useThemeColors();
  return /* @__PURE__ */ jsx54(
    "div",
    {
      className: clsx28(
        "shadow-custom mt-4 flex items-center gap-2 rounded-md p-2",
        componentBg,
        className
      ),
      children: options.map(({ value, icon }) => /* @__PURE__ */ jsx54(
        "button",
        {
          className: clsx28(
            "flex items-center gap-2 rounded-md p-2 transition-all",
            value === viewMode ? componentBgLighter : "text-bg-500 hover:text-bg-800 dark:hover:text-bg-50"
          ),
          onClick: () => {
            setViewMode(value);
          },
          children: /* @__PURE__ */ jsx54(Icon29, { className: "size-6", icon })
        },
        value
      ))
    }
  );
}
var ViewModeSelector_default = ViewModeSelector;

// src/components/utilities/DashboardItem.tsx
import { Icon as Icon30 } from "@iconify/react";
import clsx29 from "clsx";
import { useTranslation as useTranslation21 } from "react-i18next";
import _15 from "lodash";
import { jsx as jsx55, jsxs as jsxs35 } from "react/jsx-runtime";
function DashboardItem({
  ref,
  className = "",
  icon,
  title,
  children,
  componentBesideTitle,
  namespace = "modules.dashboard"
}) {
  const { t } = useTranslation21(namespace);
  const { componentBg } = useThemeColors();
  return /* @__PURE__ */ jsxs35(
    "div",
    {
      ref,
      className: clsx29(
        "shadow-custom flex size-full flex-col gap-4 rounded-lg p-6",
        componentBg,
        className
      ),
      children: [
        /* @__PURE__ */ jsxs35("div", { className: "flex-between mb-2 flex", children: [
          /* @__PURE__ */ jsxs35("h2", { className: "flex items-center gap-2 text-xl font-semibold", children: [
            /* @__PURE__ */ jsx55(Icon30, { className: "text-2xl", icon }),
            /* @__PURE__ */ jsx55("span", { className: "ml-2", children: t(`widgets.${_15.camelCase(title)}.title`) })
          ] }),
          componentBesideTitle
        ] }),
        children
      ]
    }
  );
}
var DashboardItem_default = DashboardItem;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/ImageURL.tsx
import { Icon as Icon31 } from "@iconify/react";
import { Fragment as Fragment17, jsx as jsx56, jsxs as jsxs36 } from "react/jsx-runtime";
function ImageURL({
  file,
  setFile,
  setPreview
}) {
  return /* @__PURE__ */ jsxs36(Fragment17, { children: [
    /* @__PURE__ */ jsx56(
      TextInput_default,
      {
        darker: true,
        icon: "tabler:link",
        name: "Image link",
        namespace: "common.misc",
        placeholder: "https://example.com/image.jpg",
        tKey: "imageUpload",
        setValue: (value) => {
          setFile(value);
          setPreview(value);
        },
        value: file === null ? "" : file
      }
    ),
    /* @__PURE__ */ jsxs36("div", { className: "bg-bg-200 dark:bg-bg-800/50 relative isolate mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-md", children: [
      /* @__PURE__ */ jsx56("img", { alt: "", className: "h-full object-contain", src: file }),
      /* @__PURE__ */ jsx56(
        Icon31,
        {
          className: "text-bg-300 dark:text-bg-700 absolute top-1/2 left-1/2 z-[-1] size-32 -translate-x-1/2 -translate-y-1/2",
          icon: "tabler:photo"
        }
      )
    ] })
  ] });
}
var ImageURL_default = ImageURL;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/LocalUpload/index.tsx
import { parse } from "file-type-mime";
import { useCallback as useCallback2 } from "react";
import { useDropzone } from "react-dropzone";

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/LocalUpload/components/DnDContainer.tsx
import { Icon as Icon32 } from "@iconify/react";
import { useTranslation as useTranslation22 } from "react-i18next";
import { jsx as jsx57, jsxs as jsxs37 } from "react/jsx-runtime";
function DnDContainer({
  getRootProps,
  getInputProps,
  isDragActive
}) {
  const { t } = useTranslation22("common.misc");
  return /* @__PURE__ */ jsxs37(
    "div",
    __spreadProps(__spreadValues({
      className: "flex-center border-bg-500 size-full min-h-96 flex-1 flex-col rounded-lg border-[3px] border-dashed py-12"
    }, getRootProps()), {
      children: [
        /* @__PURE__ */ jsx57("input", __spreadValues({}, getInputProps())),
        /* @__PURE__ */ jsx57(Icon32, { className: "text-bg-500 size-20", icon: "tabler:drag-drop" }),
        /* @__PURE__ */ jsx57("div", { className: "text-bg-500 mt-4 text-center text-2xl font-medium", children: isDragActive ? t("dnd.dropHere") : t("dnd.dragAndDropToUpload") }),
        /* @__PURE__ */ jsx57("div", { className: "text-bg-500 mt-4 text-center text-lg font-semibold tracking-widest uppercase", children: t("dnd.or") }),
        /* @__PURE__ */ jsx57(
          Button_default,
          {
            as: "label",
            className: "mt-4 cursor-pointer",
            icon: "tabler:upload",
            variant: "secondary",
            children: "upload"
          }
        )
      ]
    })
  );
}
var DnDContainer_default = DnDContainer;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/LocalUpload/components/PreviewContainer.tsx
import { jsx as jsx58, jsxs as jsxs38 } from "react/jsx-runtime";
function PreviewContainer({
  preview,
  setPreview,
  file,
  setFile,
  fileName,
  onRemove
}) {
  return /* @__PURE__ */ jsxs38("div", { className: "flex-center flex-1", children: [
    preview !== null && /* @__PURE__ */ jsxs38("div", { className: "bg-bg-200/50 shadow-custom dark:bg-bg-800/50 relative flex min-h-32 w-full flex-col overflow-hidden rounded-lg p-6", children: [
      /* @__PURE__ */ jsxs38("div", { className: "flex-between mb-6 ml-4 flex", children: [
        /* @__PURE__ */ jsx58("p", { className: "w-full truncate", children: fileName != null ? fileName : file == null ? void 0 : file.name }),
        /* @__PURE__ */ jsx58(
          Button_default,
          {
            icon: "tabler:x",
            variant: "no-bg",
            onClick: () => {
              setPreview(null);
              setFile(null);
              onRemove == null ? void 0 : onRemove();
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx58("img", { alt: "", className: "m-auto max-h-96 rounded-md", src: preview })
    ] }),
    file !== null && preview === null && /* @__PURE__ */ jsxs38("div", { className: "mb-6 flex w-full items-center justify-between gap-8", children: [
      /* @__PURE__ */ jsx58("p", { className: "w-full truncate", children: file.name }),
      /* @__PURE__ */ jsx58(
        Button_default,
        {
          className: "p-2!",
          icon: "tabler:x",
          variant: "no-bg",
          onClick: () => {
            setPreview(null);
            setFile(null);
            onRemove == null ? void 0 : onRemove();
          }
        }
      )
    ] })
  ] });
}
var PreviewContainer_default = PreviewContainer;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/LocalUpload/index.tsx
import { jsx as jsx59 } from "react/jsx-runtime";
function LocalUpload({
  acceptedMimeTypes,
  setFile,
  file,
  setPreview,
  preview
}) {
  const onDrop = useCallback2((acceptedFiles) => {
    setPreview(null);
    acceptedFiles[0].arrayBuffer().then((buffer) => {
      const mimeType = parse(buffer);
      if (mimeType !== void 0 && mimeType.mime.startsWith("image")) {
        const file2 = new FileReader();
        file2.onload = function() {
          setPreview(file2.result);
        };
        file2.readAsDataURL(acceptedFiles[0]);
      }
      setFile(acceptedFiles[0]);
    }).catch(console.error);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedMimeTypes
  });
  return file === null ? /* @__PURE__ */ jsx59(
    DnDContainer_default,
    {
      getInputProps,
      getRootProps,
      isDragActive
    }
  ) : /* @__PURE__ */ jsx59(
    PreviewContainer_default,
    {
      file,
      preview,
      setFile,
      setPreview
    }
  );
}
var LocalUpload_default = LocalUpload;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/Pixabay/index.tsx
import { useState as useState12 } from "react";
import { toast as toast7 } from "react-toastify";

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/Pixabay/components/SearchResults.tsx
import clsx30 from "clsx";
import PhotoAlbum from "react-photo-album";
import { jsx as jsx60, jsxs as jsxs39 } from "react/jsx-runtime";
function SearchResults({
  results,
  page,
  setPage,
  file,
  setFile,
  setPreview,
  onSearch
}) {
  return /* @__PURE__ */ jsxs39(Scrollbar_default, { className: "size-full min-h-[50vh] flex-1", children: [
    /* @__PURE__ */ jsx60(
      Pagination_default,
      {
        className: "mb-4",
        currentPage: page,
        totalPages: Math.ceil(results.total / 20),
        onPageChange: (page2) => {
          setPage(page2);
          onSearch(page2).catch(console.error);
        }
      }
    ),
    /* @__PURE__ */ jsx60("div", { className: "px-2", children: /* @__PURE__ */ jsx60(
      PhotoAlbum,
      {
        layout: "rows",
        photos: results.hits.map((image) => ({
          src: image.thumbnail.url,
          width: image.thumbnail.width,
          height: image.thumbnail.height,
          key: image.id,
          fullResURL: image.imageURL
        })),
        renderPhoto: ({ photo, imageProps: { src, alt, style } }) => /* @__PURE__ */ jsx60(
          "button",
          {
            className: clsx30(
              "bg-bg-200 dark:bg-bg-800/50 relative isolate block overflow-hidden rounded-md outline outline-2 transition-all",
              photo.fullResURL === file ? "outline-custom-500" : "hover:outline-bg-500 outline-transparent"
            ),
            style,
            onClick: () => {
              setFile(photo.fullResURL);
              setPreview(photo.src);
            },
            children: /* @__PURE__ */ jsx60("img", { alt, className: "size-full object-cover", src })
          }
        ),
        spacing: 8
      }
    ) }),
    /* @__PURE__ */ jsx60(
      Pagination_default,
      {
        className: "mt-4",
        currentPage: page,
        totalPages: Math.ceil(results.total / 20),
        onPageChange: (page2) => {
          setPage(page2);
          onSearch(page2).catch(console.error);
        }
      }
    )
  ] });
}
var SearchResults_default = SearchResults;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/Pixabay/index.tsx
import { Fragment as Fragment18, jsx as jsx61, jsxs as jsxs40 } from "react/jsx-runtime";
function Pixabay({
  file,
  setFile,
  setPreview,
  filters,
  setIsSearchFilterModalOpen
}) {
  const [query, setQuery] = useState12("");
  const [results, setResults] = useState12(
    null
  );
  const [page, setPage] = useState12(1);
  const [loading, setLoading] = useState12(false);
  function onSearch(page2) {
    return __async(this, null, function* () {
      if (loading) return;
      if (query === "") {
        toast7.error("Please enter a search query");
        return;
      }
      setResults(null);
      setLoading(true);
      const params = new URLSearchParams({
        q: query,
        page: page2.toString(),
        // TODO
        type: filters.imageType,
        category: filters.category,
        colors: filters.colors,
        editors_choice: filters.isEditorsChoice ? "true" : "false"
      });
      try {
        const data = yield fetchAPI(
          `pixabay/search?${params.toString()}`
        );
        setResults(data);
      } catch (e) {
        setResults("error");
      } finally {
        setLoading(false);
      }
    });
  }
  return /* @__PURE__ */ jsxs40(Fragment18, { children: [
    /* @__PURE__ */ jsxs40("div", { className: "flex w-full min-w-0 flex-col items-center gap-2 sm:flex-row", children: [
      /* @__PURE__ */ jsx61(
        SearchInput_default,
        {
          filterAmount: [
            filters.imageType !== "all",
            filters.category,
            filters.colors,
            filters.isEditorsChoice
          ].filter((e) => e).length,
          hasTopMargin: false,
          namespace: "common.modals",
          searchQuery: query,
          setSearchQuery: setQuery,
          stuffToSearch: "pixabay",
          tKey: "pixabay",
          onFilterIconClick: () => {
            setIsSearchFilterModalOpen(true);
          },
          onKeyUp: (e) => {
            if (e.key === "Enter") {
              setPage(1);
              onSearch(1).catch(console.error);
            }
          }
        }
      ),
      /* @__PURE__ */ jsx61(
        Button_default,
        {
          iconAtEnd: true,
          className: "w-full sm:w-auto",
          icon: "tabler:arrow-right",
          loading,
          onClick: () => {
            setPage(1);
            onSearch(1).catch(console.error);
          },
          children: "Search"
        }
      )
    ] }),
    /* @__PURE__ */ jsx61("div", { className: "mt-6 flex h-full flex-1 flex-col", children: (() => {
      switch (results) {
        case "error":
          return /* @__PURE__ */ jsx61("div", { className: "flex-center size-full flex-1", children: /* @__PURE__ */ jsx61(ErrorScreen_default, { message: "Failed to fetch data" }) });
        case null:
          return loading ? /* @__PURE__ */ jsx61("div", { className: "flex-center size-full flex-1", children: /* @__PURE__ */ jsx61(LoadingScreen, {}) }) : /* @__PURE__ */ jsx61("div", { className: "flex-center mb-6 size-full flex-1", children: /* @__PURE__ */ jsx61(
            EmptyStateScreen_default,
            {
              icon: "simple-icons:pixabay",
              name: "pixabay",
              namespace: "common.modals",
              tKey: "imagePicker"
            }
          ) });
        default:
          return results.total === 0 ? /* @__PURE__ */ jsx61(
            EmptyStateScreen_default,
            {
              icon: "tabler:photo-off",
              name: "result",
              namespace: "common.modals",
              tKey: "imagePicker"
            }
          ) : /* @__PURE__ */ jsx61(
            SearchResults_default,
            {
              file,
              page,
              results,
              setFile,
              setPage,
              setPreview,
              onSearch
            }
          );
      }
    })() })
  ] });
}
var Pixabay_default = Pixabay;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/components/Pixabay/components/SearchFilterModal.tsx
import { Switch as Switch2 } from "@headlessui/react";
import { Icon as Icon33 } from "@iconify/react";
import clsx31 from "clsx";
import { useTranslation as useTranslation23 } from "react-i18next";
import { Fragment as Fragment19, jsx as jsx62, jsxs as jsxs41 } from "react/jsx-runtime";
var IMAGE_TYPES = [
  { id: "all", icon: "tabler:category" },
  { id: "photo", icon: "tabler:photo" },
  { id: "illustration", icon: "tabler:brush" },
  { id: "vector", icon: "tabler:vector" }
];
var CATEGORIES = [
  { name: "None", id: "", icon: "tabler:circle" },
  { name: "Backgrounds", id: "backgrounds", icon: "tabler:background" },
  { name: "Fashion", id: "fashion", icon: "tabler:shirt" },
  { name: "Nature", id: "nature", icon: "tabler:leaf" },
  { name: "Science", id: "science", icon: "tabler:flask" },
  { name: "Education", id: "education", icon: "tabler:book" },
  { name: "Feelings", id: "feelings", icon: "tabler:mood-smile" },
  { name: "Health", id: "health", icon: "tabler:heart" },
  { name: "People", id: "people", icon: "tabler:users" },
  { name: "Religion", id: "religion", icon: "tabler:cross" },
  { name: "Places", id: "places", icon: "tabler:map" },
  { name: "Animals", id: "animals", icon: "tabler:dog" },
  { name: "Industry", id: "industry", icon: "tabler:tools" },
  { name: "Computer", id: "computer", icon: "tabler:cpu" },
  { name: "Food", id: "food", icon: "tabler:burger" },
  { name: "Sports", id: "sports", icon: "tabler:ball-basketball" },
  { name: "Transportation", id: "transportation", icon: "tabler:car" },
  { name: "Travel", id: "travel", icon: "tabler:plane" },
  { name: "Buildings", id: "buildings", icon: "tabler:building" },
  { name: "Business", id: "business", icon: "tabler:briefcase" },
  { name: "Music", id: "music", icon: "tabler:music" }
];
var COLORS = [
  { name: "None", id: "", color: "transparent" },
  { name: "Grayscale", id: "grayscale", color: "gray" },
  { name: "Transparent", id: "transparent", color: "transparent" },
  { name: "Red", id: "red", color: "red" },
  { name: "Orange", id: "orange", color: "orange" },
  { name: "Yellow", id: "yellow", color: "yellow" },
  { name: "Green", id: "green", color: "green" },
  { name: "Turquoise", id: "turquoise", color: "turquoise" },
  { name: "Blue", id: "blue", color: "blue" },
  { name: "Lilac", id: "lilac", color: "#C95EFB" },
  { name: "Pink", id: "pink", color: "pink" },
  { name: "White", id: "white", color: "white" },
  { name: "Gray", id: "gray", color: "gray" },
  { name: "Black", id: "black", color: "black" },
  { name: "Brown", id: "brown", color: "brown" }
];
function SearchFilterModal({
  isOpen,
  onClose,
  filters,
  updateFilters
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const { t } = useTranslation23("common.misc");
  return /* @__PURE__ */ jsxs41(ModalWrapper_default, { isOpen, minWidth: "30vw", children: [
    /* @__PURE__ */ jsx62(
      ModalHeader_default,
      {
        icon: "tabler:filter",
        title: "Search Filters",
        onClose
      }
    ),
    /* @__PURE__ */ jsxs41("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx62(
        ListboxOrComboboxInput_default,
        {
          buttonContent: /* @__PURE__ */ jsxs41(Fragment19, { children: [
            /* @__PURE__ */ jsx62(
              Icon33,
              {
                className: "size-5",
                icon: (_b = (_a = IMAGE_TYPES.find((l) => l.id === filters.imageType)) == null ? void 0 : _a.icon) != null ? _b : ""
              }
            ),
            /* @__PURE__ */ jsx62("span", { className: "-mt-px block truncate", children: t(
              `imageUpload.imageType.${(_c = IMAGE_TYPES.find((l) => l.id === filters.imageType)) == null ? void 0 : _c.id}`
            ) })
          ] }),
          icon: "tabler:list",
          name: "image type",
          namespace: "common.misc",
          setValue: (value) => {
            updateFilters({ type: "SET_IMAGE_TYPE", payload: value });
          },
          tKey: "imageUpload",
          type: "listbox",
          value: filters.imageType,
          children: IMAGE_TYPES.map(({ icon, id }, i) => /* @__PURE__ */ jsx62(
            ListboxOrComboboxOption_default,
            {
              icon,
              text: t(`imageUpload.imageType.${id}`),
              value: id
            },
            i
          ))
        }
      ),
      /* @__PURE__ */ jsx62(
        ListboxOrComboboxInput_default,
        {
          buttonContent: /* @__PURE__ */ jsxs41(Fragment19, { children: [
            /* @__PURE__ */ jsx62(
              Icon33,
              {
                className: "size-5",
                icon: (_e = (_d = CATEGORIES.find((l) => l.id === filters.category)) == null ? void 0 : _d.icon) != null ? _e : ""
              }
            ),
            /* @__PURE__ */ jsx62("span", { className: "-mt-px block truncate", children: (_g = (_f = CATEGORIES.find((l) => l.id === filters.category)) == null ? void 0 : _f.name) != null ? _g : "None" })
          ] }),
          icon: "tabler:category",
          name: "image Category",
          namespace: "common.misc",
          setValue: (value) => {
            updateFilters({ type: "SET_CATEGORY", payload: value });
          },
          tKey: "imageUpload",
          type: "listbox",
          value: filters.category,
          children: CATEGORIES.map(({ name, icon, id }, i) => /* @__PURE__ */ jsx62(
            ListboxOrComboboxOption_default,
            {
              icon,
              text: name,
              value: id
            },
            i
          ))
        }
      ),
      /* @__PURE__ */ jsx62(
        ListboxOrComboboxInput_default,
        {
          buttonContent: /* @__PURE__ */ jsxs41(Fragment19, { children: [
            /* @__PURE__ */ jsx62(
              "div",
              {
                className: "border-bg-200 dark:border-bg-700 size-3 rounded-full border",
                style: {
                  backgroundColor: (_h = COLORS.find((l) => l.id === filters.colors)) == null ? void 0 : _h.color
                }
              }
            ),
            /* @__PURE__ */ jsx62("span", { className: "-mt-px block truncate", children: (_j = (_i = COLORS.find((l) => l.id === filters.colors)) == null ? void 0 : _i.name) != null ? _j : "None" })
          ] }),
          icon: "tabler:color-swatch",
          name: "Image Color",
          namespace: "common.misc",
          setValue: (value) => {
            updateFilters({ type: "SET_COLORS", payload: value });
          },
          tKey: "imageUpload",
          type: "listbox",
          value: filters.colors,
          children: COLORS.map(({ name, color, id }, i) => /* @__PURE__ */ jsx62(
            ListboxOrComboboxOption_default,
            {
              color,
              text: name,
              value: id
            },
            i
          ))
        }
      ),
      /* @__PURE__ */ jsxs41("div", { className: "flex items-center justify-between py-2", children: [
        /* @__PURE__ */ jsxs41("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx62(Icon33, { className: "size-6", icon: "tabler:user-star" }),
          /* @__PURE__ */ jsx62("span", { className: "text-lg", children: t("imageUpload.inputs.editorsChoice") })
        ] }),
        /* @__PURE__ */ jsx62(
          Switch2,
          {
            checked: filters.isEditorsChoice,
            className: clsx31(
              "relative inline-flex h-6 w-11 items-center rounded-full",
              filters.isEditorsChoice ? "bg-custom-500" : "bg-bg-300 dark:bg-bg-800"
            ),
            onChange: () => {
              updateFilters({
                type: "SET_IS_EDITORS_CHOICE",
                payload: !filters.isEditorsChoice
              });
            },
            children: /* @__PURE__ */ jsx62(
              "span",
              {
                className: clsx31(
                  "inline-block size-4 rounded-full transition",
                  filters.isEditorsChoice ? "bg-bg-100 translate-x-6" : "bg-bg-100 dark:bg-bg-500 translate-x-1"
                )
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx62(Button_default, { className: "mt-6", icon: "tabler:check", onClick: onClose, children: "Apply Filters" })
  ] });
}
var SearchFilterModal_default = SearchFilterModal;

// src/components/inputs/ImageAndFileInput/ImagePickerModal/index.tsx
import { Fragment as Fragment20, jsx as jsx63, jsxs as jsxs42 } from "react/jsx-runtime";
var initialFilter = {
  imageType: "all",
  category: "",
  colors: "",
  isEditorsChoice: false
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_IMAGE_TYPE":
      return __spreadProps(__spreadValues({}, state), { imageType: action.payload });
    case "SET_CATEGORY":
      return __spreadProps(__spreadValues({}, state), { category: action.payload });
    case "SET_COLORS":
      return __spreadProps(__spreadValues({}, state), { colors: action.payload });
    case "SET_IS_EDITORS_CHOICE":
      return __spreadProps(__spreadValues({}, state), { isEditorsChoice: action.payload });
    default:
      return state;
  }
}
function ImagePickerModal({
  isOpen,
  onClose,
  enablePixaBay = false,
  enableUrl = false,
  acceptedMimeTypes,
  onSelect
}) {
  const { t } = useTranslation24("common.modals");
  const [file, setFile] = useState13(null);
  const [preview, setPreview] = useState13(null);
  const [mode, setMode] = useState13("local");
  const [loading, setLoading] = useState13(false);
  const [isSearchFilterModalOpen, setIsSearchFilterModalOpen] = useState13(false);
  const [filters, updateFilters] = useReducer(reducer, initialFilter);
  useEffect7(() => {
    if (!isOpen) {
      setFile(null);
      setMode("local");
    }
  }, [isOpen]);
  return /* @__PURE__ */ jsxs42(Fragment20, { children: [
    /* @__PURE__ */ jsxs42(ModalWrapper_default, { className: "overflow-hidden", isOpen, minWidth: "70vw", children: [
      /* @__PURE__ */ jsx63(
        ModalHeader_default,
        {
          icon: "tabler:photo",
          title: "imagePicker.title",
          onClose
        }
      ),
      (enablePixaBay || enableUrl) && /* @__PURE__ */ jsx63(
        Tabs_default,
        {
          active: mode,
          enabled: ["local", "url", "pixabay"].filter(
            (name) => name === "pixabay" && enablePixaBay || name === "url" && enableUrl
          ),
          items: [
            {
              name: t("imagePicker.pixabay"),
              icon: "tabler:upload",
              id: "local"
            },
            {
              name: t("imagePicker.url"),
              icon: "tabler:link",
              id: "url"
            },
            {
              name: t("imagePicker.pixabay"),
              icon: "simple-icons:pixabay",
              id: "pixabay"
            }
          ],
          onNavClick: (id) => {
            setMode(id);
            setFile(null);
          }
        }
      ),
      /* @__PURE__ */ jsx63("div", { className: "flex h-full min-h-0 flex-1 flex-col overflow-auto", children: (() => {
        switch (mode) {
          case "local":
            return /* @__PURE__ */ jsx63(
              LocalUpload_default,
              {
                acceptedMimeTypes,
                file,
                preview,
                setFile,
                setPreview
              }
            );
          case "url":
            return /* @__PURE__ */ jsx63(
              ImageURL_default,
              {
                file,
                setFile,
                setPreview
              }
            );
          case "pixabay":
            return /* @__PURE__ */ jsx63(
              Pixabay_default,
              {
                file,
                filters,
                setFile,
                setIsSearchFilterModalOpen,
                setPreview
              }
            );
        }
      })() }),
      /* @__PURE__ */ jsx63(
        Button_default,
        {
          className: "mt-4",
          disabled: file === null,
          icon: "tabler:check",
          loading,
          onClick: () => {
            setLoading(true);
            onSelect(file, preview).catch(console.error).finally(() => {
              setLoading(false);
              onClose();
            });
          },
          children: "select"
        }
      )
    ] }),
    /* @__PURE__ */ jsx63(
      SearchFilterModal_default,
      {
        filters,
        isOpen: isSearchFilterModalOpen,
        updateFilters,
        onClose: () => {
          setIsSearchFilterModalOpen(false);
        }
      }
    )
  ] });
}
var ImagePickerModal_default = ImagePickerModal;

// src/components/inputs/ColorInput/ColorPickerModal/index.tsx
import { Colorful, EditableInput } from "@uiw/react-color";
import { useCallback as useCallback3, useEffect as useEffect8, useState as useState14 } from "react";

// src/components/inputs/ColorInput/ColorPickerModal/components/MorandiColorPaletteModal.tsx
import { Icon as Icon34 } from "@iconify/react";
import clsx32 from "clsx";
import { sortFn } from "color-sorter";

// src/constants/morandi_colors.ts
var MORANDI_COLORS = [
  "#a39797",
  "#976666",
  "#b95756",
  "#a08887",
  "#cc5f5a",
  "#ebc2c0",
  "#c09d9b",
  "#e8d8d7",
  "#e2c6c4",
  "#cba29e",
  "#a1706b",
  "#b87f78",
  "#e4c7c3",
  "#d4b8b4",
  "#ddbcb7",
  "#c3aaa6",
  "#8c736f",
  "#d3bbb7",
  "#492620",
  "#eed1cc",
  "#c39289",
  "#f4baaf",
  "#e4745e",
  "#f77e66",
  "#f2d5cf",
  "#e3d0cc",
  "#e2cfcb",
  "#e6dedc",
  "#cfa79d",
  "#f2eeed",
  "#f2dbd5",
  "#c7a9a1",
  "#ab8c83",
  "#8d6b61",
  "#fd9270",
  "#dea592",
  "#956757",
  "#57372b",
  "#88807d",
  "#f3c2af",
  "#dfbfb2",
  "#d09075",
  "#f3d2c3",
  "#674d41",
  "#664a3d",
  "#a39087",
  "#f4c7b0",
  "#b86b43",
  "#e4b69e",
  "#e1aa8d",
  "#c1b0a7",
  "#ca774b",
  "#a98978",
  "#59321d",
  "#a87153",
  "#cea48d",
  "#f0ded4",
  "#b89886",
  "#cfc3bc",
  "#7d6252",
  "#ddd0c8",
  "#f9ece4",
  "#f8d4bc",
  "#bfada1",
  "#d8c6ba",
  "#f4d4be",
  "#8e6e57",
  "#f4ebe4",
  "#a39183",
  "#927157",
  "#d6c3b4",
  "#ccb9aa",
  "#ebd8c9",
  "#845937",
  "#8f6849",
  "#dbb89c",
  "#bb6f32",
  "#b09279",
  "#ec8f3f",
  "#c0b0a2",
  "#c4bab1",
  "#eae0d7",
  "#ddcfc2",
  "#aa7d53",
  "#996430",
  "#908982",
  "#dbd2c9",
  "#9d5a16",
  "#ba8249",
  "#ddab77",
  "#cea77e",
  "#e7caa8",
  "#fde0be",
  "#d9913c",
  "#fec37d",
  "#877865",
  "#ccc5bc",
  "#eedac0",
  "#c5ab89",
  "#fed59e",
  "#d2cabf",
  "#c5bdb2",
  "#efd3ac",
  "#f8e8d1",
  "#d3ac73",
  "#d4c3aa",
  "#f1d09d",
  "#e7d4b5",
  "#adaaa5",
  "#c4c1bc",
  "#eddfc4",
  "#dbd4c6",
  "#e6c786",
  "#dfdcd5",
  "#faeec7",
  "#f4e8c0",
  "#c1bfac",
  "#a09952",
  "#bfbc9d",
  "#5b5611",
  "#b5af5a",
  "#403d10",
  "#928d3c",
  "#666218",
  "#cecb88",
  "#d2d2d0",
  "#e1e1df",
  "#ebebe9",
  "#b2b2a8",
  "#c0c182",
  "#f3f4d5",
  "#d6d9b9",
  "#798223",
  "#4f5518",
  "#8f9650",
  "#646d20",
  "#dcddd5",
  "#3b420e",
  "#dee1cb",
  "#b2ba81",
  "#d1d3c5",
  "#cfd1c4",
  "#eff0ea",
  "#d9dfc5",
  "#cddaa5",
  "#b6b9ae",
  "#bbbeb5",
  "#eef1ea",
  "#c6ccc0",
  "#4c5445",
  "#8a9585",
  "#3b4338",
  "#adb5ab",
  "#1f2c1c",
  "#161d15",
  "#ccd2cc",
  "#a9b7aa",
  "#aab8ab",
  "#d6e1d7",
  "#37613c",
  "#889f8b",
  "#a8b2aa",
  "#737c75",
  "#2b4832",
  "#17341e",
  "#95a098",
  "#bfd1c4",
  "#dff7e6",
  "#478058",
  "#a2afa6",
  "#0f2c18",
  "#4a7056",
  "#678f74",
  "#728a7a",
  "#7c9788",
  "#597a69",
  "#2a483a",
  "#c1ccc7",
  "#cadbd4",
  "#d4e3dd",
  "#4e6e62",
  "#e6f1ed",
  "#a1b0ad",
  "#82aba3",
  "#93a3a0",
  "#d6dcdb",
  "#627676",
  "#d0dcdd",
  "#c9d3d5",
  "#66828e",
  "#82898d",
  "#b6bbbe",
  "#b3cad8",
  "#becbd3",
  "#9da8af",
  "#2a4c65",
  "#e3e7ea",
  "#999ea2",
  "#7a848d",
  "#586d80",
  "#818c98",
  "#bdc4cc",
  "#8592a2",
  "#60656c",
  "#8e9aab",
  "#8e9bae",
  "#97a5c0",
  "#53565c",
  "#dcdddf",
  "#75809c",
  "#bfc2cb",
  "#9297ab",
  "#8d8fa4",
  "#93939b",
  "#b7b7bd",
  "#e0dfe4",
  "#b1acb3",
  "#8b7f8b",
  "#a392a2",
  "#c9b4c7",
  "#d7cdd5",
  "#72626c",
  "#ece3e8",
  "#ebe2e5",
  "#efd5dc",
  "#8d6a6e",
  "#dac1c2",
  "#f8f8f8",
  "#bebebe"
];

// src/components/inputs/ColorInput/ColorPickerModal/components/MorandiColorPaletteModal.tsx
import { jsx as jsx64, jsxs as jsxs43 } from "react/jsx-runtime";
function MorandiColorPaletteModal({
  isOpen,
  onClose,
  color,
  setColor
}) {
  return /* @__PURE__ */ jsxs43(ModalWrapper_default, { isOpen, minWidth: "60vw", children: [
    /* @__PURE__ */ jsx64(
      ModalHeader_default,
      {
        icon: "tabler:flower",
        title: "colorPicker.modals.morandiColorPalette",
        onClose
      }
    ),
    /* @__PURE__ */ jsx64("div", { className: "grid w-full grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-4 p-4 pt-0", children: MORANDI_COLORS.sort(sortFn).map((morandiColor, index) => /* @__PURE__ */ jsx64(
      "button",
      {
        className: clsx32(
          "flex-center shadow-custom aspect-square size-full cursor-pointer rounded-md",
          color === morandiColor && "ring-bg-900 ring-offset-bg-100 dark:ring-bg-50 dark:ring-offset-bg-900 ring-2 ring-offset-2"
        ),
        style: { backgroundColor: morandiColor },
        onClick: () => {
          setColor(morandiColor);
          onClose();
        },
        children: color === morandiColor && /* @__PURE__ */ jsx64(
          Icon34,
          {
            className: clsx32(
              "size-8",
              isLightColor(morandiColor) ? "text-bg-800" : "text-bg-50"
            ),
            icon: "tabler:check"
          }
        )
      },
      index
    )) })
  ] });
}
var MorandiColorPaletteModal_default = MorandiColorPaletteModal;

// src/components/inputs/ColorInput/ColorPickerModal/components/TailwindCSSColorPalette/index.tsx
import colors from "tailwindcss/colors";

// src/components/inputs/ColorInput/ColorPickerModal/components/TailwindCSSColorPalette/components/ColorItem.tsx
import { Icon as Icon35 } from "@iconify/react";
import clsx33 from "clsx";
import { useMemo as useMemo5 } from "react";
import { jsx as jsx65, jsxs as jsxs44 } from "react/jsx-runtime";
function ColorItem({
  name,
  value,
  selected,
  onSelect
}) {
  const colorHex = useMemo5(() => oklchToHex(value), [value]);
  return /* @__PURE__ */ jsxs44("li", { className: "w-full", children: [
    /* @__PURE__ */ jsx65(
      "button",
      {
        className: clsx33(
          "flex-center shadow-custom aspect-square w-full cursor-pointer rounded-md",
          selected === value && "ring-bg-900 ring-offset-bg-100 dark:ring-bg-50 dark:ring-offset-bg-900 ring-2 ring-offset-2"
        ),
        style: { backgroundColor: value },
        onClick: () => onSelect(colorHex),
        children: selected === colorHex && /* @__PURE__ */ jsx65(
          Icon35,
          {
            className: clsx33(
              isLightColor(colorHex) ? "text-bg-800" : "text-bg-50",
              "size-8"
            ),
            icon: "tabler:check"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx65("p", { className: "mt-2 text-xs font-medium", children: name }),
    /* @__PURE__ */ jsx65("code", { className: "text-bg-500 block text-xs font-medium", children: colorHex })
  ] }, value);
}
var ColorItem_default = ColorItem;

// src/components/inputs/ColorInput/ColorPickerModal/components/TailwindCSSColorPalette/index.tsx
import { jsx as jsx66, jsxs as jsxs45 } from "react/jsx-runtime";
function TailwindCSSColorsModal({
  isOpen,
  onClose,
  color,
  setColor
}) {
  return /* @__PURE__ */ jsxs45(ModalWrapper_default, { isOpen, minWidth: "70vw", children: [
    /* @__PURE__ */ jsx66(
      ModalHeader_default,
      {
        icon: "tabler:brand-tailwind",
        title: "colorPicker.modals.morandiColorPalette",
        onClose
      }
    ),
    /* @__PURE__ */ jsx66("div", { className: "space-y-3 overflow-y-auto", children: [...Object.keys(colors)].filter(
      (colorGroup) => typeof colors[colorGroup] === "object" && ![
        "warmGray",
        "coolGray",
        "blueGray",
        "trueGray",
        "lightBlue"
      ].includes(colorGroup)
    ).map((colorGroup, index) => /* @__PURE__ */ jsxs45("div", { className: "flex flex-col sm:flex-row", children: [
      /* @__PURE__ */ jsx66("h2", { className: "my-4 w-28 text-left text-xl font-medium sm:mb-2 sm:text-base", children: colorGroup[0].toUpperCase() + colorGroup.slice(1) }),
      /* @__PURE__ */ jsx66(
        "ul",
        {
          className: "grid w-full grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] flex-wrap gap-3 pt-0",
          children: Object.entries(
            colors[colorGroup]
          ).map(([colorName, colorValue]) => /* @__PURE__ */ jsx66(
            ColorItem_default,
            {
              name: colorName,
              selected: color,
              value: colorValue,
              onSelect: (color2) => {
                setColor(color2);
                onClose();
              }
            },
            colorName
          ))
        },
        index
      )
    ] }, colorGroup)) })
  ] });
}
var TailwindCSSColorPalette_default = TailwindCSSColorsModal;

// src/components/inputs/ColorInput/ColorPickerModal/index.tsx
import { Fragment as Fragment21, jsx as jsx67, jsxs as jsxs46 } from "react/jsx-runtime";
function checkContrast(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1e3;
  return yiq >= 128 ? "#000000" : "#ffffff";
}
function ColorPickerModal({
  isOpen,
  setOpen,
  color,
  setColor
}) {
  const [innerColor, setInnerColor] = useState14(color.toLowerCase());
  const [morandiColorPaletteModalOpen, setMorandiColorPaletteModalOpen] = useState14(false);
  const [tailwindCSSColorsModalOpen, setTailwindCSSColorsModalOpen] = useState14(false);
  const confirmColor = useCallback3(() => {
    setColor(innerColor);
    setOpen(false);
  }, [innerColor, setColor, setOpen]);
  const handleClose = useCallback3(() => {
    setOpen(false);
  }, [setOpen]);
  const handleColorChange = useCallback3((color2) => {
    setInnerColor(color2.hex);
  }, []);
  const handleInputChange = useCallback3(
    (e) => {
      setInnerColor(`#${e.target.value}`);
    },
    []
  );
  useEffect8(() => {
    setInnerColor(color.toLowerCase());
  }, [color]);
  return /* @__PURE__ */ jsxs46(Fragment21, { children: [
    /* @__PURE__ */ jsxs46(ModalWrapper_default, { className: "sm:min-w-[28rem]!", isOpen, children: [
      /* @__PURE__ */ jsx67(
        ModalHeader_default,
        {
          icon: "tabler:color-picker",
          title: "colorPicker.title",
          onClose: handleClose
        }
      ),
      /* @__PURE__ */ jsx67(
        Colorful,
        {
          disableAlpha: true,
          className: "w-full!",
          color: innerColor,
          onChange: handleColorChange
        }
      ),
      /* @__PURE__ */ jsx67(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `.w-color-editable-input input {
          background-color: ${innerColor} !important;
          color: ${checkContrast(innerColor)} !important;
        }`
          }
        }
      ),
      /* @__PURE__ */ jsx67(
        EditableInput,
        {
          className: "mt-4 border-0 p-4 text-2xl font-semibold",
          label: "Hex",
          value: innerColor,
          onChange: handleInputChange
        }
      ),
      /* @__PURE__ */ jsx67(
        Button_default,
        {
          className: "mb-2",
          icon: "tabler:flower",
          variant: "secondary",
          onClick: () => {
            setMorandiColorPaletteModalOpen(true);
          },
          children: "Morandi Color Palette"
        }
      ),
      /* @__PURE__ */ jsx67(
        Button_default,
        {
          className: "mb-2 bg-teal-500! hover:bg-teal-600!",
          icon: "tabler:brand-tailwind",
          variant: "primary",
          onClick: () => {
            setTailwindCSSColorsModalOpen(true);
          },
          children: "Tailwind CSS Color Palette"
        }
      ),
      /* @__PURE__ */ jsx67(Button_default, { icon: "tabler:check", onClick: confirmColor, children: "Select" })
    ] }),
    /* @__PURE__ */ jsx67(
      MorandiColorPaletteModal_default,
      {
        color: innerColor,
        isOpen: morandiColorPaletteModalOpen,
        setColor: setInnerColor,
        onClose: () => {
          setMorandiColorPaletteModalOpen(false);
        }
      }
    ),
    /* @__PURE__ */ jsx67(
      TailwindCSSColorPalette_default,
      {
        color: innerColor,
        isOpen: tailwindCSSColorsModalOpen,
        setColor: setInnerColor,
        onClose: () => {
          setTailwindCSSColorsModalOpen(false);
        }
      }
    )
  ] });
}
var ColorPickerModal_default = ColorPickerModal;

// src/components/inputs/IconInput/IconPickerModal/index.tsx
import { Icon as Icon40 } from "@iconify/react";
import { useState as useState19 } from "react";

// src/components/inputs/IconInput/IconPickerModal/pages/IconSet.tsx
import { useEffect as useEffect9, useMemo as useMemo6, useState as useState16 } from "react";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";

// src/components/inputs/IconInput/IconPickerModal/components/ChipSelector.tsx
import { Icon as Icon37 } from "@iconify/react";
import clsx35 from "clsx";
import { useState as useState15 } from "react";

// src/components/inputs/IconInput/IconPickerModal/components/Chip.tsx
import { Icon as Icon36 } from "@iconify/react";
import clsx34 from "clsx";
import { jsx as jsx68, jsxs as jsxs47 } from "react/jsx-runtime";
function Chip({
  text,
  icon,
  selected,
  onClick
}) {
  return /* @__PURE__ */ jsxs47(
    "button",
    {
      className: clsx34(
        selected ? "bg-custom-500! text-bg-50 dark:text-bg-800 font-semibold shadow-xs" : "bg-bg-50 hover:bg-bg-100 dark:bg-bg-800 dark:hover:bg-bg-700/70",
        "flex-center h-8 grow cursor-pointer gap-2 rounded-full px-6 text-sm whitespace-nowrap shadow-sm transition-all duration-100 md:grow-0"
      ),
      type: "button",
      onClick,
      children: [
        icon !== void 0 && /* @__PURE__ */ jsx68(Icon36, { className: "size-5", icon }),
        text
      ]
    }
  );
}
var Chip_default = Chip;

// src/components/inputs/IconInput/IconPickerModal/components/ChipSelector.tsx
import { Fragment as Fragment22, jsx as jsx69, jsxs as jsxs48 } from "react/jsx-runtime";
function ChipSelector({
  options,
  value,
  setValue
}) {
  const [expanded, setExpanded] = useState15(false);
  return options.length > 0 ? /* @__PURE__ */ jsxs48("div", { className: "mt-4 flex items-center gap-2", children: [
    /* @__PURE__ */ jsx69(
      "div",
      {
        className: clsx35(
          "flex gap-2 pb-1 transition-all",
          expanded ? "flex-wrap" : "overflow-x-auto"
        ),
        children: options.sort((a, b) => {
          if (a[0] === b[0]) return a.length - b.length;
          return a.localeCompare(b);
        }).map((option) => /* @__PURE__ */ jsx69(
          Chip_default,
          {
            selected: value === option,
            text: option,
            onClick: () => {
              setValue(value === option ? null : option);
              setExpanded(false);
            }
          },
          option
        ))
      }
    ),
    /* @__PURE__ */ jsx69(
      "button",
      {
        className: "flex-center text-bg-500 hover:text-bg-800 dark:hover:text-bg-100 h-8 grow gap-2 rounded-full px-2 text-sm whitespace-nowrap transition-all duration-100 md:grow-0",
        type: "button",
        onClick: () => {
          setExpanded(!expanded);
        },
        children: /* @__PURE__ */ jsx69(
          Icon37,
          {
            className: clsx35("size-6 transition-all", expanded && "rotate-180"),
            icon: "uil:angle-up"
          }
        )
      }
    )
  ] }) : /* @__PURE__ */ jsx69(Fragment22, {});
}
var ChipSelector_default = ChipSelector;

// src/components/inputs/IconInput/IconPickerModal/components/IconEntry.tsx
import { Icon as Icon38 } from "@iconify/react";
import { jsx as jsx70, jsxs as jsxs49 } from "react/jsx-runtime";
function IconEntry({
  icon,
  iconSet,
  setSelectedIcon,
  setOpen
}) {
  return /* @__PURE__ */ jsxs49(
    "button",
    {
      className: "hover:bg-bg-200/70 dark:hover:bg-bg-800 flex h-min w-full cursor-pointer flex-col items-center rounded-lg p-4 transition-all",
      type: "button",
      onClick: () => {
        setSelectedIcon(`${iconSet}:${icon}`);
        setOpen(false);
      },
      children: [
        /* @__PURE__ */ jsx70(Icon38, { height: "32", icon: `${iconSet}:${icon}`, width: "32" }),
        /* @__PURE__ */ jsx70("p", { className: "mt-4 -mb-0.5 text-center text-xs font-medium tracking-wide break-all", children: icon.replace(/-/g, " ") })
      ]
    }
  );
}
var IconEntry_default = IconEntry;

// src/components/inputs/IconInput/IconPickerModal/pages/IconSet.tsx
import { jsx as jsx71, jsxs as jsxs50 } from "react/jsx-runtime";
var AS = AutoSizer;
var L = List;
function getIconSet(prefix) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(
        `https://api.iconify.design/collection?prefix=${prefix}`
      ).then((res2) => __async(this, null, function* () {
        return yield res2.json();
      }));
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  });
}
function IconSet({
  setOpen,
  iconSet,
  setSelectedIcon
}) {
  var _a;
  const [searchTerm, setSearchTerm] = useState16("");
  const [currentTag, setCurrentTag] = useState16(null);
  const [iconData, setIconData] = useState16(null);
  const filteredIconList = useMemo6(() => {
    var _a2, _b;
    const allIcons = [
      ...(_a2 = iconData == null ? void 0 : iconData.uncategorized) != null ? _a2 : [],
      ...Object.values((_b = iconData == null ? void 0 : iconData.categories) != null ? _b : {}).flat()
    ];
    if (!iconData) return [];
    if (!currentTag) {
      return allIcons.filter(
        (icon) => icon.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return (iconData.categories[currentTag] || []).filter(
      (icon) => icon.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, currentTag, iconData]);
  useEffect9(() => {
    getIconSet(iconSet).then((data) => {
      setIconData(data);
    }).catch(console.error);
  }, []);
  return iconData ? /* @__PURE__ */ jsxs50("div", { className: "flex size-full min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ jsx71("h1", { className: "mb-6 flex flex-col items-center gap-1 text-center text-3xl font-semibold tracking-wide sm:inline", children: iconData.title }),
    /* @__PURE__ */ jsx71(
      SearchInput_default,
      {
        hasTopMargin: false,
        namespace: "common.modals",
        searchQuery: searchTerm,
        setSearchQuery: setSearchTerm,
        stuffToSearch: "icon",
        tKey: "iconPicker"
      }
    ),
    /* @__PURE__ */ jsx71(
      ChipSelector_default,
      {
        options: Object.keys((_a = iconData.categories) != null ? _a : {}),
        setValue: setCurrentTag,
        value: currentTag
      }
    ),
    /* @__PURE__ */ jsx71("div", { className: "flex min-h-0 flex-1 flex-col", children: filteredIconList.length ? /* @__PURE__ */ jsx71(AS, { className: "mt-6", children: ({ width, height }) => {
      const itemsPerRow = Math.floor(width / 160) || 1;
      return /* @__PURE__ */ jsx71(
        L,
        {
          height: height - 12,
          itemsPerRow: Math.floor(width / filteredIconList.length) || 1,
          rowCount: Math.ceil(filteredIconList.length / itemsPerRow),
          rowHeight: 120,
          rowRenderer: ({
            index,
            key,
            style
          }) => {
            const fromIndex = index * itemsPerRow;
            const toIndex = fromIndex + itemsPerRow;
            return /* @__PURE__ */ jsx71(
              "div",
              {
                className: "flex w-full gap-4",
                style,
                children: filteredIconList.slice(fromIndex, toIndex).map((icon) => /* @__PURE__ */ jsx71(
                  IconEntry_default,
                  {
                    icon,
                    iconSet,
                    setOpen,
                    setSelectedIcon
                  },
                  icon
                ))
              },
              key
            );
          },
          width
        }
      );
    } }) : /* @__PURE__ */ jsx71("div", { className: "flex-center flex-1", children: /* @__PURE__ */ jsx71(
      EmptyStateScreen_default,
      {
        icon: "tabler:icons-off",
        name: "icon",
        namespace: "common.modals",
        tKey: "iconPicker"
      }
    ) }) })
  ] }) : /* @__PURE__ */ jsx71("div", { className: "flex w-full justify-center pb-8", children: /* @__PURE__ */ jsx71("span", { className: "loader" }) });
}
var IconSet_default = IconSet;

// src/components/inputs/IconInput/IconPickerModal/pages/IconSetList/index.tsx
import { collections as importedCollections2 } from "@iconify/collections";
import { useState as useState17 } from "react";

// src/components/inputs/IconInput/IconPickerModal/pages/IconSetList/components/IconSetEntry.tsx
import { Icon as Icon39 } from "@iconify/react";
import { jsx as jsx72, jsxs as jsxs51 } from "react/jsx-runtime";
function IconSetEntry({
  iconSet,
  setCurrentIconSet
}) {
  var _a, _b;
  return /* @__PURE__ */ jsxs51(
    "button",
    {
      className: "bg-bg-50 shadow-custom dark:bg-bg-800 dark:hover:bg-bg-700/50 flex w-full grow flex-col overflow-hidden rounded-md transition-all hover:bg-bg-200/70",
      type: "button",
      onClick: () => {
        setCurrentIconSet({ iconSet: iconSet.prefix });
      },
      children: [
        /* @__PURE__ */ jsx72("div", { className: "flex w-full shrink-0 flex-col font-medium", children: /* @__PURE__ */ jsx72("div", { className: "flex-center size-full gap-5 px-4 py-6", children: (_a = iconSet.samples) == null ? void 0 : _a.map((sampleIcon) => /* @__PURE__ */ jsx72(
          Icon39,
          {
            className: "size-8 shrink-0",
            icon: `${iconSet.prefix}:${sampleIcon}`
          },
          sampleIcon
        )) }) }),
        /* @__PURE__ */ jsxs51("div", { className: "flex w-full flex-col justify-between px-4 pb-3 text-left", children: [
          /* @__PURE__ */ jsx72("h3", { className: "truncate text-xl font-semibold", children: iconSet.name }),
          /* @__PURE__ */ jsxs51("p", { className: "mt-1 truncate text-sm", children: [
            "By\xA0",
            /* @__PURE__ */ jsx72("span", { className: "underline", children: iconSet.author.name })
          ] }),
          /* @__PURE__ */ jsxs51("div", { className: "sssm:py-0 flex-between border-bg-200 dark:border-bg-500 mt-4 flex w-full border-t pt-4 text-sm", children: [
            /* @__PURE__ */ jsxs51("p", { children: [
              (_b = iconSet.total) == null ? void 0 : _b.toLocaleString(),
              " icons"
            ] }),
            iconSet.height !== void 0 && /* @__PURE__ */ jsxs51("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx72(
                Icon39,
                {
                  height: "20",
                  icon: "icon-park-outline:auto-height-one",
                  width: "20"
                }
              ),
              /* @__PURE__ */ jsx72("p", { className: "ml-1", children: iconSet.height })
            ] })
          ] })
        ] })
      ]
    },
    iconSet.prefix
  );
}
var IconSetEntry_default = IconSetEntry;

// src/components/inputs/IconInput/IconPickerModal/pages/IconSetList/components/CategoryEntry.tsx
import { jsx as jsx73, jsxs as jsxs52 } from "react/jsx-runtime";
function CategoryEntry({
  category,
  iconSets,
  iconFilterTerm,
  setCurrentIconSet
}) {
  return /* @__PURE__ */ jsxs52("div", { className: "mb-6 w-full overflow-hidden", children: [
    /* @__PURE__ */ jsx73("div", { className: "after:border-b-bg-800 dark:after:border-b-bg-200 relative mb-8 rounded-lg text-center text-2xl font-medium after:absolute after:-bottom-2 after:left-1/2 after:w-8 after:-translate-x-1/2 after:border-b-2", children: category }),
    /* @__PURE__ */ jsx73("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] flex-wrap gap-4", children: iconSets.map(
      (iconSet) => (iconFilterTerm.trim() === "" || iconSet.name.toLowerCase().includes(iconFilterTerm.trim().toLowerCase())) && /* @__PURE__ */ jsx73(
        IconSetEntry_default,
        {
          iconSet,
          setCurrentIconSet
        },
        iconSet.prefix
      )
    ) })
  ] });
}
var CategoryEntry_default = CategoryEntry;

// src/components/inputs/IconInput/IconPickerModal/pages/IconSetList/components/Header.tsx
import { collections as importedCollections } from "@iconify/collections";
import { useMemo as useMemo7 } from "react";
import { Fragment as Fragment23, jsx as jsx74, jsxs as jsxs53 } from "react/jsx-runtime";
var collections = importedCollections;
function Header({
  searchQuery,
  setSearchQuery,
  setCurrentIconSet,
  selectedCategory,
  setSelectedCategory,
  iconFilterTerm,
  setIconFilterTerm
}) {
  const categories = useMemo7(
    () => [
      ...new Set(
        Object.values(collections).map((e) => e.category).filter((e) => e !== void 0)
      )
    ],
    []
  );
  return /* @__PURE__ */ jsxs53(Fragment23, { children: [
    /* @__PURE__ */ jsxs53("div", { className: "flex w-full flex-col gap-2 sm:flex-row", children: [
      /* @__PURE__ */ jsx74(
        SearchInput_default,
        {
          hasTopMargin: false,
          namespace: "common.modals",
          searchQuery,
          setSearchQuery,
          stuffToSearch: "icon",
          tKey: "iconPicker",
          onKeyUp: (e) => {
            if (e.key === "Enter" && searchQuery !== "") {
              setCurrentIconSet({ search: searchQuery });
            }
          }
        }
      ),
      /* @__PURE__ */ jsx74(
        Button_default,
        {
          iconAtEnd: true,
          icon: "tabler:arrow-right",
          onClick: () => {
            if (searchQuery !== "") setCurrentIconSet({ search: searchQuery });
          },
          children: "Search"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs53("div", { className: "flex w-full flex-col items-center gap-8 lg:flex-row", children: [
      /* @__PURE__ */ jsx74("div", { className: "mt-4 flex w-full flex-wrap gap-2", children: categories.map((category) => /* @__PURE__ */ jsx74(
        Chip_default,
        {
          selected: selectedCategory === category,
          text: category,
          onClick: () => {
            setSelectedCategory(
              selectedCategory === category ? null : category
            );
          }
        },
        category
      )) }),
      /* @__PURE__ */ jsx74("div", { className: "w-full lg:w-3/5 xl:w-1/3", children: /* @__PURE__ */ jsx74(
        SearchInput_default,
        {
          customIcon: "tabler:filter",
          hasTopMargin: false,
          namespace: "common.modals",
          searchQuery: iconFilterTerm,
          setSearchQuery: setIconFilterTerm,
          stuffToSearch: "Icon Set",
          tKey: "iconPicker"
        }
      ) })
    ] })
  ] });
}
var Header_default = Header;

// src/components/inputs/IconInput/IconPickerModal/pages/IconSetList/index.tsx
import { jsx as jsx75, jsxs as jsxs54 } from "react/jsx-runtime";
var collections2 = importedCollections2;
var COLLECTIONS = Object.entries(collections2).reduce((acc, [key, value]) => {
  var _a;
  const cat = (_a = value.category) != null ? _a : "Uncategorized";
  if (acc[cat] === void 0) {
    acc[cat] = [];
  }
  acc[cat].push(__spreadProps(__spreadValues({}, value), { prefix: key }));
  return acc;
}, {});
function IconSetList({
  setCurrentIconSet
}) {
  const [searchQuery, setSearchQuery] = useState17("");
  const [selectedCategory, setSelectedCategory] = useState17(null);
  const [iconFilterTerm, setIconFilterTerm] = useState17("");
  return /* @__PURE__ */ jsxs54("div", { className: "flex h-full min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ jsx75(
      Header_default,
      {
        iconFilterTerm,
        searchQuery,
        selectedCategory,
        setCurrentIconSet,
        setIconFilterTerm,
        setSearchQuery,
        setSelectedCategory
      }
    ),
    /* @__PURE__ */ jsx75(Scrollbar_default, { autoHeight: true, autoHeightMax: "60vh", children: /* @__PURE__ */ jsx75("div", { className: "mt-4 flex min-h-0 w-full flex-col items-center overflow-scroll", children: /* @__PURE__ */ jsx75("div", { className: "flex w-full flex-col", children: Object.entries(COLLECTIONS).map(
      ([category, iconSets]) => Boolean(
        (selectedCategory === null || selectedCategory === category) && iconSets.filter(
          (iconSet) => iconFilterTerm.trim() === "" || iconSet.name.toLowerCase().includes(iconFilterTerm.trim().toLowerCase())
        ).length
      ) && /* @__PURE__ */ jsx75(
        CategoryEntry_default,
        {
          category,
          iconFilterTerm,
          iconSets,
          setCurrentIconSet
        },
        category
      )
    ) }) }) })
  ] });
}

// src/components/inputs/IconInput/IconPickerModal/pages/Search.tsx
import { useEffect as useEffect10, useState as useState18 } from "react";
import AutoSizer2 from "react-virtualized/dist/commonjs/AutoSizer";
import List2 from "react-virtualized/dist/commonjs/List";
import { jsx as jsx76, jsxs as jsxs55 } from "react/jsx-runtime";
var AS2 = AutoSizer2;
var L2 = List2;
function getIconSet2(searchTerm) {
  return __async(this, null, function* () {
    try {
      const res = yield fetch(
        `https://api.iconify.design/search?query=${searchTerm}&limit=9999`
      );
      const data = yield res.json();
      let iconList = [];
      if (data.icons.length > 0) {
        iconList = data.icons;
      } else {
        iconList = [];
      }
      const iconSets = data.collections;
      return {
        iconList,
        iconSets
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  });
}
function Search({
  setOpen,
  searchTerm,
  setSelectedIcon,
  setCurrentIconSetProp
}) {
  const [currentIconSet, setCurrentIconSet] = useState18(null);
  const [iconData, setIconData] = useState18(null);
  const [filteredIconList, setFilteredIconList] = useState18([]);
  const [searchQuery, setSearchQuery] = useState18(searchTerm != null ? searchTerm : "");
  useEffect10(() => {
    setIconData(null);
    getIconSet2(searchTerm).then((data) => {
      setIconData(data);
      setFilteredIconList(data.iconList);
      setCurrentIconSet(null);
    }).catch((err) => {
      console.error(err);
    });
  }, [searchTerm]);
  useEffect10(() => {
    if (iconData !== null) {
      setFilteredIconList(
        currentIconSet !== null ? iconData.iconList.filter(
          (e) => e.split(":").shift() === currentIconSet
        ) : iconData.iconList
      );
    }
  }, [currentIconSet, iconData]);
  return iconData !== null ? /* @__PURE__ */ jsxs55("div", { className: "flex min-h-0 w-full flex-1 flex-col", children: [
    /* @__PURE__ */ jsxs55("div", { className: "flex w-full gap-2", children: [
      /* @__PURE__ */ jsx76(
        SearchInput_default,
        {
          hasTopMargin: false,
          namespace: "common.modals",
          searchQuery,
          setSearchQuery,
          stuffToSearch: "icon",
          tKey: "iconPicker",
          onKeyUp: (e) => {
            if (e.key === "Enter" && searchQuery !== "") {
              setCurrentIconSetProp({ search: searchQuery });
            }
          }
        }
      ),
      /* @__PURE__ */ jsx76(
        Button_default,
        {
          iconAtEnd: true,
          icon: "tabler:arrow-right",
          onClick: () => {
            if (searchQuery !== "") {
              setCurrentIconSetProp({ search: searchQuery });
            }
          },
          children: "Search"
        }
      )
    ] }),
    /* @__PURE__ */ jsx76(
      ChipSelector_default,
      {
        options: Object.keys(iconData.iconSets),
        setValue: setCurrentIconSet,
        value: currentIconSet
      }
    ),
    /* @__PURE__ */ jsx76("div", { className: "flex min-h-0 flex-1 flex-col", children: filteredIconList.length > 0 ? /* @__PURE__ */ jsx76(AS2, { className: "mt-6", children: ({ width, height }) => {
      const itemsPerRow = Math.floor(width / 160) || 1;
      return /* @__PURE__ */ jsx76(
        L2,
        {
          height: height - 12,
          itemsPerRow: Math.floor(width / filteredIconList.length) || 1,
          rowCount: Math.ceil(filteredIconList.length / itemsPerRow),
          rowHeight: 120,
          rowRenderer: ({
            index,
            key,
            style
          }) => {
            const fromIndex = index * itemsPerRow;
            const toIndex = fromIndex + itemsPerRow;
            return /* @__PURE__ */ jsx76(
              "div",
              {
                className: "flex w-full gap-4",
                style,
                children: filteredIconList.slice(fromIndex, toIndex).map((icon) => {
                  var _a, _b;
                  return /* @__PURE__ */ jsx76(
                    IconEntry_default,
                    {
                      icon: (_a = icon.split(":").pop()) != null ? _a : "",
                      iconSet: (_b = icon.split(":").shift()) != null ? _b : "",
                      setOpen,
                      setSelectedIcon
                    },
                    icon
                  );
                })
              },
              key
            );
          },
          width
        }
      );
    } }) : /* @__PURE__ */ jsx76("div", { className: "flex-center h-full flex-1", children: /* @__PURE__ */ jsx76(
      EmptyStateScreen_default,
      {
        icon: "tabler:icons-off",
        name: "icon",
        namespace: "common.modals",
        tKey: "iconPicker"
      }
    ) }) })
  ] }) : /* @__PURE__ */ jsx76("div", { className: "flex w-full justify-center pb-8", children: /* @__PURE__ */ jsx76("span", { className: "loader" }) });
}
var Search_default = Search;

// src/components/inputs/IconInput/IconPickerModal/index.tsx
import { jsx as jsx77, jsxs as jsxs56 } from "react/jsx-runtime";
function IconPickerModal({
  isOpen,
  setOpen,
  setSelectedIcon
}) {
  const [currentIconSet, setCurrentIconSet] = useState19(null);
  function renderContent() {
    var _a;
    if (currentIconSet === null) {
      return /* @__PURE__ */ jsx77(IconSetList, { setCurrentIconSet });
    }
    if (currentIconSet.search !== void 0) {
      return /* @__PURE__ */ jsx77(
        Search_default,
        {
          searchTerm: currentIconSet.search,
          setCurrentIconSetProp: setCurrentIconSet,
          setOpen,
          setSelectedIcon
        }
      );
    }
    return /* @__PURE__ */ jsx77(
      IconSet_default,
      {
        iconSet: (_a = currentIconSet.iconSet) != null ? _a : "",
        setOpen,
        setSelectedIcon
      }
    );
  }
  return /* @__PURE__ */ jsxs56(ModalWrapper_default, { isOpen, minHeight: "80vh", minWidth: "80vw", children: [
    currentIconSet !== null ? /* @__PURE__ */ jsxs56("div", { className: "flex-between mb-8 flex w-full", children: [
      /* @__PURE__ */ jsx77(GoBackButton_default, { onClick: () => setCurrentIconSet(null) }),
      /* @__PURE__ */ jsx77(
        "button",
        {
          className: "text-bg-500 hover:bg-bg-100 hover:text-bg-800 dark:hover:bg-bg-800 dark:hover:text-bg-50 rounded-md p-2 transition-all",
          onClick: () => {
            setCurrentIconSet(null);
            setSelectedIcon("");
            setOpen(false);
          },
          children: /* @__PURE__ */ jsx77(Icon40, { className: "size-6", icon: "tabler:x" })
        }
      )
    ] }) : /* @__PURE__ */ jsx77(
      ModalHeader_default,
      {
        appendTitle: /* @__PURE__ */ jsxs56("p", { className: "shrink-0 text-right text-sm sm:text-base", children: [
          "powered by\xA0",
          /* @__PURE__ */ jsx77(
            "a",
            {
              className: "underline",
              href: "https://iconify.design",
              rel: "noreferrer",
              target: "_blank",
              children: "Iconify"
            }
          )
        ] }),
        icon: "tabler:icons",
        title: "iconPicker.title",
        onClose: () => {
          setOpen(false);
        }
      }
    ),
    renderContent()
  ] });
}
var IconPickerModal_default = IconPickerModal;

// src/components/inputs/QRCodeScanner.tsx
import { Scanner } from "@yudiel/react-qr-scanner";
import { jsx as jsx78, jsxs as jsxs57 } from "react/jsx-runtime";
function QRCodeScanner({
  isOpen,
  onClose,
  onScanned
}) {
  return /* @__PURE__ */ jsxs57(ModalWrapper_default, { isOpen, minHeight: "30rem", children: [
    /* @__PURE__ */ jsx78(
      ModalHeader_default,
      {
        icon: "tabler:qrcode",
        title: "qrCodeScanner",
        onClose
      }
    ),
    isOpen && /* @__PURE__ */ jsx78("div", { className: "relative aspect-square h-full w-full", children: /* @__PURE__ */ jsx78(
      Scanner,
      {
        allowMultiple: false,
        classNames: {
          container: "size-full! [&_svg]:size-full! [&_div_div_div:has(svg)]:hidden",
          video: "top-1/2! left-1/2! absolute! -translate-x-1/2! -translate-y-1/2!"
        },
        onScan: (codes) => {
          onClose();
          onScanned(codes[0].rawValue);
        }
      }
    ) })
  ] });
}
var QRCodeScanner_default = QRCodeScanner;

// src/components/sidebar/SidebarWrapper.tsx
import clsx36 from "clsx";
import { jsx as jsx79, jsxs as jsxs58 } from "react/jsx-runtime";
function SidebarWrapper({
  isOpen,
  setOpen,
  customHeight,
  children
}) {
  return /* @__PURE__ */ jsx79(
    "aside",
    {
      className: clsx36(
        "bg-bg-50 shadow-custom dark:bg-bg-900 xl:bg-bg-50/50 xl:dark:bg-bg-900/50 absolute top-0 z-9990 size-full shrink-0 rounded-lg py-4 backdrop-blur-xs transition-all duration-300 xl:static xl:w-1/4 xl:min-w-96 xl:backdrop-blur-xs",
        isOpen ? "left-0" : "left-full",
        customHeight != null ? customHeight : "xl:h-[calc(100%-2rem)]"
      ),
      children: /* @__PURE__ */ jsxs58(Scrollbar_default, { children: [
        /* @__PURE__ */ jsx79("div", { className: "flex-between flex px-8 py-4 xl:hidden", children: /* @__PURE__ */ jsx79(
          GoBackButton_default,
          {
            onClick: () => {
              setOpen(false);
            }
          }
        ) }),
        /* @__PURE__ */ jsx79("ul", { className: "flex size-full min-w-0 flex-col", children })
      ] })
    }
  );
}
var SidebarWrapper_default = SidebarWrapper;

// src/components/sidebar/SidebarItem/index.tsx
import { useMemo as useMemo8, useState as useState21 } from "react";
import { useLocation as useLocation2, useNavigate } from "react-router";

// src/components/sidebar/SidebarItem/components/SidebarCancelButton.tsx
import { Icon as Icon41 } from "@iconify/react";
import { jsx as jsx80 } from "react/jsx-runtime";
function SidebarCancelButton({
  onClick
}) {
  return /* @__PURE__ */ jsx80(
    "button",
    {
      className: "text-bg-500 hover:bg-bg-200/50 hover:text-bg-800 dark:hover:bg-bg-700/50 dark:hover:text-bg-50 z-9999 overscroll-contain rounded-md p-2",
      onClick: (e) => {
        e.stopPropagation();
        onClick();
      },
      children: /* @__PURE__ */ jsx80(Icon41, { className: "size-5", icon: "tabler:x" })
    }
  );
}
var SidebarCancelButton_default = SidebarCancelButton;

// src/components/sidebar/SidebarItem/components/SidebarCollapseButton.tsx
import clsx37 from "clsx";
import { jsx as jsx81 } from "react/jsx-runtime";
function SidebarCollapseButton({
  onClick,
  isCollapsed
}) {
  return /* @__PURE__ */ jsx81(
    Button_default,
    {
      className: "p-2!",
      icon: "tabler:chevron-down",
      iconClassName: clsx37("transition", isCollapsed && "rotate-180"),
      variant: "no-bg",
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }
    }
  );
}
var SidebarCollapseButton_default = SidebarCollapseButton;

// src/components/sidebar/SidebarItem/components/SidebarItemContent.tsx
import { Icon as Icon42 } from "@iconify/react";
import clsx38 from "clsx";
import { useState as useState20 } from "react";
import { useTranslation as useTranslation25 } from "react-i18next";
import _16 from "lodash";
import { Fragment as Fragment24, jsx as jsx82, jsxs as jsxs59 } from "react/jsx-runtime";
function SidebarItemContent({
  name,
  sidebarExpanded,
  isMainSidebarItem,
  hasAI,
  number,
  hamburgerMenuItems,
  active,
  onCancelButtonClick,
  namespace,
  needTranslate
}) {
  const { t } = useTranslation25([namespace, "common.sidebar"]);
  const [isMenuOpen, setIsMenuOpen] = useState20(false);
  return /* @__PURE__ */ jsxs59(Fragment24, { children: [
    /* @__PURE__ */ jsxs59("div", { className: "flex-between flex w-full min-w-0 gap-4", children: [
      (() => {
        if (!isMainSidebarItem) {
          return /* @__PURE__ */ jsx82("div", { className: "block w-full min-w-0 truncate", children: needTranslate ? t([`${namespace}:sidebar.${_16.camelCase(name)}`, name]) : name });
        }
        return sidebarExpanded && /* @__PURE__ */ jsxs59("span", { className: "flex-between flex w-full gap-2 truncate", children: [
          /* @__PURE__ */ jsx82("span", { className: "max-w-48 min-w-0 truncate", children: t(`common.sidebar:modules.${_16.camelCase(name)}.title`) }),
          hasAI && /* @__PURE__ */ jsx82(
            Icon42,
            {
              className: "text-custom-500 size-4",
              icon: "mage:stars-c"
            }
          )
        ] });
      })(),
      number !== void 0 && /* @__PURE__ */ jsx82(
        "span",
        {
          className: clsx38(
            "pr-2 text-sm",
            (() => {
              if (isMenuOpen || onCancelButtonClick !== void 0 && active) {
                return "hidden";
              } else if (hamburgerMenuItems !== void 0) {
                return "group-hover:hidden";
              } else {
                return "block";
              }
            })()
          ),
          children: number.toLocaleString()
        }
      )
    ] }),
    !active && hamburgerMenuItems !== void 0 && /* @__PURE__ */ jsx82(
      HamburgerMenu_default,
      {
        smallerPadding: true,
        className: clsx38(
          "relative overscroll-contain",
          !isMenuOpen && "hidden group-hover:block"
        ),
        onButtonClick: (e) => {
          e.stopPropagation();
          setIsMenuOpen(true);
        },
        onClose: () => {
          setIsMenuOpen(false);
        },
        children: hamburgerMenuItems
      }
    )
  ] });
}
var SidebarItemContent_default = SidebarItemContent;

// src/components/sidebar/SidebarItem/components/SidebarItemIcon.tsx
import { Icon as Icon43 } from "@iconify/react";
import clsx39 from "clsx";
import { Fragment as Fragment25, jsx as jsx83 } from "react/jsx-runtime";
function SidebarItemIcon({
  icon,
  active
}) {
  return /* @__PURE__ */ jsx83(Fragment25, { children: icon !== void 0 && /* @__PURE__ */ jsx83(Fragment25, { children: typeof icon === "string" ? /* @__PURE__ */ jsx83(
    Icon43,
    {
      className: clsx39("size-6 shrink-0", active && "text-custom-500"),
      icon
    }
  ) : icon }) });
}
var SidebarItemIcon_default = SidebarItemIcon;

// src/components/sidebar/SidebarItem/components/SidebarItemSubsection.tsx
import { Icon as Icon44 } from "@iconify/react";
import clsx40 from "clsx";
import _17 from "lodash";
import { useTranslation as useTranslation26 } from "react-i18next";
import { Link as Link3, useLocation } from "react-router";
import { jsx as jsx84, jsxs as jsxs60 } from "react/jsx-runtime";
function SidebarItemSubsection({
  subsection,
  name,
  sidebarExpanded,
  toggleSidebar,
  subsectionExpanded
}) {
  const { t } = useTranslation26("common.sidebar");
  const location = useLocation();
  return /* @__PURE__ */ jsx84(
    "li",
    {
      className: clsx40(
        "flex h-auto shrink-0 flex-col gap-2 overflow-hidden px-4 transition-all",
        subsectionExpanded ? "max-h-[1000px] py-2" : "max-h-0 py-0"
      ),
      children: /* @__PURE__ */ jsx84(
        "ul",
        {
          className: clsx40(
            "flex w-full flex-col items-center rounded-md",
            !sidebarExpanded && "bg-bg-800"
          ),
          children: subsection.map(([subsectionName, subsectionIcon, subsectionLink]) => /* @__PURE__ */ jsxs60(
            Link3,
            {
              className: clsx40(
                "hover:bg-bg-100/50 dark:hover:bg-bg-800/50 mx-4 flex w-full items-center gap-4 rounded-lg py-4 font-medium transition-all",
                !sidebarExpanded ? "justify-center" : "",
                sidebarExpanded ? "pl-[3.8rem]" : "px-2",
                location.pathname.split("/").slice(1)[0] === _17.kebabCase(name) && (location.pathname.split("/").slice(1)[1] === subsectionLink || location.pathname.replace(_17.kebabCase(name), "").replace(/\//g, "") === "" && subsectionName === "Dashboard") ? "bg-bg-200/30 shadow-custom dark:bg-bg-800" : "text-bg-500"
              ),
              to: `./${_17.kebabCase(name)}/${subsectionLink}`,
              onClick: () => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              },
              children: [
                /* @__PURE__ */ jsx84("div", { className: "flex size-7 items-center justify-center", children: /* @__PURE__ */ jsx84(Icon44, { className: "size-6", icon: subsectionIcon }) }),
                sidebarExpanded && /* @__PURE__ */ jsxs60("span", { className: "w-full truncate pr-4", children: [
                  t(
                    `modules.${_17.kebabCase(name)}.subsections.${_17.kebabCase(
                      subsectionName
                    )}`
                  ),
                  " "
                ] })
              ]
            },
            subsectionName
          ))
        }
      )
    }
  );
}
var SidebarItemSubsection_default = SidebarItemSubsection;

// src/components/sidebar/SidebarItem/components/SidebarItemSubsectionExpandIcon.tsx
import { Icon as Icon45 } from "@iconify/react";
import clsx41 from "clsx";
import { jsx as jsx85 } from "react/jsx-runtime";
function SidebarItemSubsectionExpandIcon({
  toggleSubsection,
  subsectionExpanded
}) {
  return /* @__PURE__ */ jsx85("div", { className: "flex-between relative flex", children: /* @__PURE__ */ jsx85(
    "button",
    {
      className: "hover:bg-bg-100 dark:hover:bg-bg-700/50 rounded-full p-1",
      onClick: toggleSubsection,
      children: /* @__PURE__ */ jsx85(
        Icon45,
        {
          className: clsx41(
            "text-bg-500 stroke-[2px] transition-all",
            subsectionExpanded && "rotate-90"
          ),
          icon: "tabler:chevron-right"
        }
      )
    }
  ) });
}
var SidebarItemSubsectionExpandIcon_default = SidebarItemSubsectionExpandIcon;

// src/components/sidebar/SidebarItem/components/SidebarItemWrapper.tsx
import clsx42 from "clsx";
import { jsx as jsx86 } from "react/jsx-runtime";
function SidebarItemWrapper({
  active,
  children,
  onClick
}) {
  return /* @__PURE__ */ jsx86(
    "li",
    {
      className: clsx42(
        "flex-center relative isolate px-4 transition-all",
        active ? "text-bg-800 after:bg-custom-500 dark:text-bg-50 font-semibold after:absolute after:top-1/2 after:right-0 after:h-8 after:w-1 after:-translate-y-1/2 after:rounded-full after:content-['']" : "text-bg-500 dark:text-bg-500"
      ),
      children: /* @__PURE__ */ jsx86(
        "div",
        {
          className: clsx42(
            "flex-between group relative flex h-14 w-full cursor-pointer gap-4 rounded-lg pr-3 pl-4 text-left whitespace-nowrap transition-all duration-100",
            active ? "bg-bg-200/50 shadow-custom dark:bg-bg-800" : "hover:bg-bg-200/30 dark:hover:bg-bg-800/30"
          ),
          role: "button",
          tabIndex: 0,
          onClick,
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              onClick == null ? void 0 : onClick();
            }
          },
          children
        }
      )
    }
  );
}
var SidebarItemWrapper_default = SidebarItemWrapper;

// src/components/sidebar/SidebarItem/index.tsx
import _18 from "lodash";
import { Fragment as Fragment26, jsx as jsx87, jsxs as jsxs61 } from "react/jsx-runtime";
function SidebarItem({
  name,
  icon,
  sideStripColor,
  showAIIcon = false,
  subsection,
  isMainSidebarItem = false,
  sidebarExpanded,
  toggleSidebar,
  onClick,
  autoActive = false,
  active = false,
  prefix = "",
  number,
  onCancelButtonClick,
  hamburgerMenuItems,
  isCollapsed,
  onCollapseButtonClick,
  showCollapseSpacer,
  namespace,
  needTranslate = true
}) {
  const location = useLocation2();
  const navigate = useNavigate();
  const [subsectionExpanded, setSubsectionExpanded] = isMainSidebarItem ? useState21(
    subsection !== void 0 && location.pathname.slice(1).startsWith(_18.kebabCase(name))
  ) : [false, () => {
  }];
  const isLocationMatched = useMemo8(
    () => location.pathname.slice(1).startsWith((prefix !== "" ? `${prefix}/` : "") + _18.kebabCase(name)),
    [location.pathname, prefix, name]
  );
  return /* @__PURE__ */ jsxs61(Fragment26, { children: [
    /* @__PURE__ */ jsxs61(
      SidebarItemWrapper_default,
      {
        active: autoActive ? isLocationMatched : active,
        onClick: () => {
          if (window.innerWidth < 1024) {
            toggleSidebar == null ? void 0 : toggleSidebar();
          }
          if (onClick !== void 0) {
            onClick();
            return;
          }
          if (isMainSidebarItem) {
            setSubsectionExpanded(true);
            navigate(
              `./${prefix !== "" ? prefix + "/" : ""}${_18.kebabCase(name)}`
            );
          }
        },
        children: [
          onCollapseButtonClick && /* @__PURE__ */ jsx87(Fragment26, { children: /* @__PURE__ */ jsx87(
            SidebarCollapseButton_default,
            {
              isCollapsed: isCollapsed === true,
              onClick: onCollapseButtonClick
            }
          ) }),
          showCollapseSpacer && !onCollapseButtonClick && /* @__PURE__ */ jsx87("div", { className: "w-8 shrink-0" }),
          sideStripColor !== void 0 && /* @__PURE__ */ jsx87(
            "span",
            {
              className: "block h-8 w-1 shrink-0 rounded-full",
              style: {
                backgroundColor: sideStripColor
              }
            }
          ),
          /* @__PURE__ */ jsx87(
            SidebarItemIcon_default,
            {
              active: autoActive ? isLocationMatched : active,
              icon
            }
          ),
          /* @__PURE__ */ jsx87(
            SidebarItemContent_default,
            {
              active: autoActive ? isLocationMatched : active,
              hamburgerMenuItems,
              hasAI: showAIIcon,
              isMainSidebarItem,
              name,
              namespace,
              needTranslate,
              number,
              sidebarExpanded: !!sidebarExpanded,
              onCancelButtonClick
            }
          ),
          sidebarExpanded && subsection !== void 0 && /* @__PURE__ */ jsx87(
            SidebarItemSubsectionExpandIcon_default,
            {
              subsectionExpanded,
              toggleSubsection: () => {
                setSubsectionExpanded(!subsectionExpanded);
              }
            }
          ),
          active && onCancelButtonClick !== void 0 && /* @__PURE__ */ jsx87(SidebarCancelButton_default, { onClick: onCancelButtonClick })
        ]
      }
    ),
    subsection !== void 0 && /* @__PURE__ */ jsx87(
      SidebarItemSubsection_default,
      {
        name,
        sidebarExpanded,
        subsection,
        subsectionExpanded,
        toggleSidebar
      }
    )
  ] });
}
var SidebarItem_default = SidebarItem;

// src/components/sidebar/SidebarTitle.tsx
import { Icon as Icon46 } from "@iconify/react";
import clsx43 from "clsx";
import _19 from "lodash";
import { useTranslation as useTranslation27 } from "react-i18next";
import { jsx as jsx88, jsxs as jsxs62 } from "react/jsx-runtime";
function SidebarTitle({
  name,
  actionButtonIcon,
  actionButtonOnClick,
  customActionButton,
  namespace
}) {
  const { t } = useTranslation27([namespace, "common.sidebar"]);
  return /* @__PURE__ */ jsxs62(
    "li",
    {
      className: clsx43(
        "flex-between flex gap-4 pt-2 pr-5 pl-8 transition-all",
        actionButtonIcon !== void 0 ? "pb-2" : "pb-4"
      ),
      children: [
        /* @__PURE__ */ jsx88("h3", { className: "text-bg-600 text-sm font-semibold tracking-widest whitespace-nowrap uppercase", children: t([
          `sidebar.${_19.camelCase(name)}`,
          `common.sidebar:categories.${_19.camelCase(name)}`,
          name
        ]) }),
        customActionButton != null ? customActionButton : actionButtonIcon !== void 0 && /* @__PURE__ */ jsx88(
          "button",
          {
            className: clsx43(
              "text-bg-600 flex items-center rounded-md p-2 transition-all",
              "hover:bg-bg-100 dark:hover:bg-bg-800 dark:hover:text-bg-50"
            ),
            onClick: actionButtonOnClick,
            children: /* @__PURE__ */ jsx88(Icon46, { className: "size-5", icon: actionButtonIcon })
          }
        )
      ]
    }
  );
}
var SidebarTitle_default = SidebarTitle;

// src/components/sidebar/SidebarDivider.tsx
import clsx44 from "clsx";
import { jsx as jsx89 } from "react/jsx-runtime";
function SidebarDivider({
  noMargin = false
}) {
  return /* @__PURE__ */ jsx89(
    "li",
    {
      className: clsx44(
        "bg-bg-200 dark:bg-bg-700/50 h-px shrink-0",
        !noMargin && "my-4"
      )
    }
  );
}
var SidebarDivider_default = SidebarDivider;
export {
  APIFallbackComponent_default as APIFallbackComponent,
  Button_default as Button,
  Checkbox_default as Checkbox,
  ColorInput_default as ColorInput,
  ColorPickerModal_default as ColorPickerModal,
  ConfigColumn_default as ConfigColumn,
  CreateOrModifyButton_default as CreateOrModifyButton,
  CreatePasswordScreen_default as CreatePasswordScreen,
  CurrencyInput_default as CurrencyInput,
  DashboardItem_default as DashboardItem,
  DateInput_default as DateInput,
  DeleteConfirmationModal_default as DeleteConfirmationModal,
  DnDContainer_default as DnDContainer,
  EmptyStateScreen_default as EmptyStateScreen,
  ErrorScreen_default as ErrorScreen,
  FAB_default as FAB,
  FormModal_default as FormModal,
  GoBackButton_default as GoBackButton,
  HamburgerMenu_default as HamburgerMenu,
  HamburgerSelectorWrapper_default as HamburgerMenuSelectorWrapper,
  HeaderFilter_default as HeaderFilter,
  IconInput_default as IconInput,
  IconPickerModal_default as IconPickerModal,
  ImageAndFileInput_default as ImageAndFileInput,
  ImagePickerModal_default as ImagePickerModal,
  InputIcon_default as InputIcon,
  InputLabel_default as InputLabel,
  InputWrapper_default as InputWrapper,
  LifeforgeUIProvider,
  ListboxNullOption_default as ListboxNullOption,
  ListboxOrComboboxInput_default as ListboxOrComboboxInput,
  ListboxOrComboboxOption_default as ListboxOrComboboxOption,
  ListboxOrComboboxOptions_default as ListboxOrComboboxOptions,
  LoadingScreen,
  LocationInput_default as LocationInput,
  LockedScreen_default as LockedScreen,
  MenuItem_default as MenuItem,
  MissingAPIKeyScreen_default as MissingAPIKeyScreen,
  ModalHeader_default as ModalHeader,
  ModalWrapper_default as ModalWrapper,
  NotFoundScreen_default as NotFoundScreen,
  OTPScreen_default as OTPScreen,
  Pagination_default as Pagination,
  PreviewContainer_default as PreviewContainer,
  QRCodeScanner_default as QRCodeScanner,
  QueryWrapper_default as QueryWrapper,
  Scrollbar_default as Scrollbar,
  SearchInput_default as SearchInput,
  SidebarDivider_default as SidebarDivider,
  SidebarItem_default as SidebarItem,
  SidebarTitle_default as SidebarTitle,
  SidebarWrapper_default as SidebarWrapper,
  Switch_default as Switch,
  Tabs_default as Tabs,
  TagsInput_default as TagsInput,
  TextInput_default as TextInput,
  ViewModeSelector_default as ViewModeSelector,
  useLifeforgeUIContext
};
