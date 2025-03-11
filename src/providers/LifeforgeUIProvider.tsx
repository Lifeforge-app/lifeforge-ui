import React, { ReactNode, useContext, createContext } from "react";

interface IThemeData {
  apiHost: string;
  googleAPIKey: string;
  theme: "light" | "dark" | "system";
  themeColor: string;
  bgTemp: string;
  bgImage: string;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setThemeColor: (color: string) => void;
  setBgTemp: (color: string) => void;
  setBgImage: (image: string) => void;
  language: string;
}

const LifeforgeUIContext = createContext<IThemeData | undefined>(undefined);

interface LifeforgeUIProviderProps {
  children: ReactNode;
  personalization?: IThemeData;
}

export const LifeforgeUIProvider: React.FC<LifeforgeUIProviderProps> = ({
  children,
  personalization,
}: {
  children: ReactNode;
  personalization?: IThemeData;
}) => {
  return (
    <LifeforgeUIContext.Provider
      value={
        personalization || {
          apiHost: "",
          googleAPIKey: "",
          theme: "dark",
          themeColor: "lime",
          bgTemp: "zinc",
          bgImage: "",
          setTheme: () => {},
          setThemeColor: () => {},
          setBgTemp: () => {},
          setBgImage: () => {},
          language: "en",
        }
      }
    >
      {children}
    </LifeforgeUIContext.Provider>
  );
};

export const useLifeforgeUIContext = () => {
  const context = useContext(LifeforgeUIContext);
  if (context === undefined) {
    throw new Error(
      "useLifeforgeUIContext must be used within a LifeforgeUIProvider"
    );
  }
  return context;
};
